interface SignupRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  dob?: string;
}

interface SignupResponseDTO {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  dob: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export { SignupRequestDTO, SignupResponseDTO };
