import { ISession } from "src/types/session.type";
import { IUser } from "src/types/user.type";

// req

export interface ILoginReq extends Pick<IUser, 'login' | 'password'> {}
export interface IRegistrationReq extends Pick<IUser, 'name' | 'login' | 'password'> {}
export interface IGetByLoginReq extends Pick<IUser, 'login'> {}
export interface ICreateSessionReq extends Pick<ISession, 'userId' | 'tokenId'> {}
export interface ICreateUserReq extends Pick<IUser, 'name' | 'login' | 'password'> {}

// res

export interface IGetByLoginRes extends Pick<IUser, 'id' | 'login' | 'password'> {}
export interface ILoginRes {
  token: string;
}