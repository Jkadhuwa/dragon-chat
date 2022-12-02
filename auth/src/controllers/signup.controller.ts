import { Response } from 'express';
import { SignupRequestDTO, SignupResponseDTO } from '../dto/signup.dto';
import {
  create,
  checkEmailExists,
  checkUsernameExists
} from '../services/signup.service';

const createUser = async (
  payload: SignupRequestDTO,
  res: Response
): Promise<SignupResponseDTO | any> => {
  const { email, username } = payload;
  const emailExist = await checkEmailExists(email);
  const usernameExists = await checkUsernameExists(username);

  if (emailExist) {
    return res
      .status(409)
      .json({ success: false, message: 'Supplied email already in use' });
  }

  if (usernameExists) {
    return res
      .status(409)
      .json({ success: false, message: 'Supplied username already in use' });
  }

  const createdUser = await create(payload);

  return res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: createdUser
  });
};

export default createUser;
