export class RegisterUserRequest {
  username: string;
  email: string;
  name: string;
  password: string;
}

export class RegisterUserResponse {
  id: string;
  username: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  token?: string;
}