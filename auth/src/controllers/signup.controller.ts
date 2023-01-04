import { Response, NextFunction } from 'express';
import { SignupRequestDTO, SignupResponseDTO } from '../dto/signup.dto';
import {
  create,
  checkEmailExists,
  checkUsernameExists
} from '../services/signup.service';
import UsernameExistException from '../exceptions/UsernameException';
import EmailExistException from '../exceptions/EmailExistsExpection';

const createUser = async (
  payload: SignupRequestDTO,
  res: Response,
  next: NextFunction
): Promise<SignupResponseDTO | any> => {
  const { email, username } = payload;
  const emailExist = await checkEmailExists(email);
  const usernameExists = await checkUsernameExists(username);

  if (emailExist) {
    return next(new EmailExistException(email));
  }

  if (usernameExists) {
    return next(new UsernameExistException(username));
  }

  const createdUser = await create(payload);

  return res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: {
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      username: createdUser.username,
      dob: createdUser.dob,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
      deletedAt: createdUser.deletedAt
    }
  });
};

export default createUser;
