export interface AuthParms {
  username: string;
  password: string;
}

export interface Auth {
  JwtToken: string;
}

export interface AuthBK {
  userToken: string | null | undefined;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface ResponseValidation {
  id: string;
  type: string;
  title?: string;
  responseMessage: string;
  responseMessageList: string[] | null | undefined;
}
