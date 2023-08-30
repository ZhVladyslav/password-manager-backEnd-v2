import { IUser } from 'src/types/user.type';

// req
export interface IGetByIdReq extends Pick<IUser, 'id'> {}
export interface IEditNameReq extends Pick<IUser, 'id' | 'name'> {}
export interface IEditPasswordReq extends Pick<IUser, 'id' | 'password'> {
  newPassword: string;
}
export interface IEditPasswordReqDb extends Pick<IUser, 'id'> {
  newPassword: string;
}
export interface IEditRoleReq extends Pick<IUser, 'id' | 'roleId'> {}
export interface IDeleteReq extends Pick<IUser, 'id' | 'password'> {}
export interface IDeleteReqDb extends Pick<IUser, 'id'> {}

// res
export interface IGetByIdRes extends Pick<IUser, 'id' | 'name' | 'roleId'> {}
export interface IGetByIdResDb extends IUser {}
