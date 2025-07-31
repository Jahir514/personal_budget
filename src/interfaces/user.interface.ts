import { Document } from 'mongoose';
//-----------------------------------------
//---------Model Related Interfaces--------
//-----------------------------------------
interface Verify {
  code?: number;
  status?: boolean;
  date?: Date;
}
interface Phone extends Verify {
  otp?: { code: string; expiresAt: Date };
  number?: string;
}
interface Contact {
  address: string;
  thana: string;
  district: string;
  division: string;
}

export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  phone?: Phone;
  avatar?: string;
  emailVerify?: Verify;
  forgotPassword?: Verify;
  contact?: Contact;
  createdAt?: Date;
  updateAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

//-----------------------------------------
//---------CRUD Related Interfaces--------
//-----------------------------------------
//user register interface
export interface IRegisterUser {
  name?: string;
  email?: string;
  phone?: string;
  password: string;
}
//user login interface
export interface ILoginUser {
  emailOrPhone: string;
  password: string;
}
//-----------------------------------------
//---------Response Related Interfaces--------
//-----------------------------------------
//user register response interface
export interface IRegisterUserResponse {
  success: true;
  message: string;
  user: null | IUser;
  token?: string;
}
//user login response interface
export interface ILoginUserResponse {
  success: true;
  message: string;
  token?: string;
  user: null | {
    name?: string;
    email: string;
    phone?: Phone;
    avatar?: string;
    emailVerify?: Verify;
    forgotPassword?: Verify;
    contact?: Contact;
  };
}
