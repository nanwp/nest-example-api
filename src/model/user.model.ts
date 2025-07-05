export class User {
  id: string;
  username: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

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
}

export class LoginUserRequest {
  username: string;
  password: string;
}

export class LoginUserResponse {
  User: User;
  accessToken: string;
}

export class SubJenisCuti {
  id: string;
  name: string;
  jenisCutiId: string;
  createdAt: Date;
  updatedAt: Date;
}
export class JenisCuti {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  subJenisCuti?: SubJenisCuti[];
}