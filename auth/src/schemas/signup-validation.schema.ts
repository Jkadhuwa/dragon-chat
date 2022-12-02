import { Schema } from 'express-validator';

const signupSchema: Schema = {
  firstName: {
    trim: true,
    notEmpty: {
      errorMessage: 'first name cannot be empty'
    },
    isLength: {
      errorMessage: 'first name should be atleast 2 characters long',
      options: {
        min: 2
      }
    },
    isAlpha: {
      errorMessage: 'first name should contain alphabets only'
    }
  },

  lastName: {
    trim: true,
    notEmpty: {
      errorMessage: 'last name cannot be empty'
    },
    isAlpha: {
      errorMessage: 'last name should contain alphabets only'
    },
    isLength: {
      errorMessage: 'last name should be atleast 2 characters long',
      options: {
        min: 2
      }
    }
  },

  email: {
    trim: true,
    notEmpty: {
      errorMessage: 'email cannot be empty'
    },
    normalizeEmail: true,
    isEmail: {
      errorMessage: 'email must be in a valid format: example@domain.com'
    }
  },

  password: {
    trim: true,
    notEmpty: {
      errorMessage: 'password should not be empty'
    },
    isLength: {
      errorMessage: 'password should be atleast 6 characters long',
      options: {
        min: 6
      }
    },
    escape: true
  },
  username: {
    trim: true,
    notEmpty: {
      errorMessage: 'username cannot be empty'
    },
    isAlpha: {
      errorMessage:
        'username should contain alphabetic characters and or with numeric value'
    },
    isAlphanumeric: {
      errorMessage:
        'username should contain alphabetic characters and or with numeric value'
    },
    isLength: {
      errorMessage: 'username should be atleast 2 characters long',
      options: {
        min: 2
      }
    },
    isString: {
      errorMessage:
        'username should contain alphabetic characters and or with numeric value'
    }
  },

  dob: {
    optional: {
      options: {
        checkFalsy: true
      }
    },
    trim: true,
    isDate: {
      options: {
        format: 'DD-MM-YYYY',
        delimiters: ['-', '/']
      },

      errorMessage: 'Enter valid date 01-01-2002'
    },
    toDate: true
  }
};

export default signupSchema;
