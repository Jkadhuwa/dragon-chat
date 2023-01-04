import { SignupRequestDTO, SignupResponseDTO } from '../dto/signup.dto';
import { User } from '../models';

const create = async (payload: SignupRequestDTO): Promise<SignupResponseDTO> =>
  User.create(payload);

const checkEmailExists = async (email: string): Promise<boolean> => {
  const exists = await User.findOne({ email }).exec();
  return !!exists;
};

const checkUsernameExists = async (username: string): Promise<boolean> => {
  const exists = await User.findOne({ username }).exec();
  return !!exists;
};

export { create, checkEmailExists, checkUsernameExists };
