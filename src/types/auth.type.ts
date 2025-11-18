export type TPayLoadLogin = {
  username: string;
  password: string;
};
export type TPayLoadRegister = {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  rePassword: string;
};
export type ResponseRegister = {
  data: string;
};

export type ResponseLogin = {
  token: string;
  refreshToken: string;
  authenticated: boolean;
};
