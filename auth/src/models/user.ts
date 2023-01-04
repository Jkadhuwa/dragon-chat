/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Model, Document, Schema, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  dob: Date;
};

export interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    dob: {
      type: Date,
      required: false,
      default: null
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre(
  'save',
  async function passwordHashing(this: UserDocument, next) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, (error, hash) => {
        if (error) {
          return next(error);
        }

        this.password = hash;
        return this.password;
        next();
      });
    });
  }
);

// userSchema.pre(
//   'save',
//   async function preSaveFunction(this: UserDocument, next) {
//     const existingUser = await User.findOne({ email: this.email });
//     if (existingUser) {
//       throw new Error('Email is already in use.');
//     }
//     next();
//   }
// );
// userSchema.pre(
//   'save',
//   async function preSaveFunction(this: UserDocument, next) {
//     const existingUser = await User.findOne({ username: this.username });
//     if (existingUser) {
//       throw new Error('Username is already in use.');
//     }
//     next();
//   }
// );

const User = model<UserDocument, UserModel>('User', userSchema);

export default User;
