import { Model, Document, Schema, model } from 'mongoose';

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
      required: true
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
  { timestamps: true }
);

const User = model<UserDocument, UserModel>('User', userSchema);

export default User;
