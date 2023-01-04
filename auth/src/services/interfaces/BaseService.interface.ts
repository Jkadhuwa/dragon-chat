import { SignupRequestDTO, SignupResponseDTO } from '../../dto/signup.dto';

interface IBaseService {
  create(input: SignupRequestDTO): Promise<SignupResponseDTO>;
  update(input: SignupRequestDTO): Promise<SignupResponseDTO>;
  getById(id: string): Promise<SignupResponseDTO>;
  getByEmail(email: string): Promise<SignupResponseDTO>;
  getAll(filters: any): Promise<SignupResponseDTO[]>;
  deleteById(id: string): Promise<boolean>;
}

export default IBaseService;
