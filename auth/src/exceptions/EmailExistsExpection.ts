import { CustomError, HttpCode } from './CustomError';

class EmailExistException extends CustomError {
  constructor(email: string) {
    super(
      `email ${email} already in use, please select another one`,
      HttpCode.CONFLICT
    );
  }
}

export default EmailExistException;
