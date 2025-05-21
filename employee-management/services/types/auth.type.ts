export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IRegisterRequest {
  username: string;
  password: string;
  fullname: string;
}

export interface IRegisterResponse {
  username: string;
  fullname: string;
}