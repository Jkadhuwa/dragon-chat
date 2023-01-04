import { CustomError, HttpCode } from './CustomError';

class UsernameExistException extends CustomError {
  constructor(username: string) {
    super(
      `username ${username} already in use, please select another one`,
      HttpCode.CONFLICT
    );
  }
}

export default UsernameExistException;
