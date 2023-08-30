import { IClaim, IRole } from 'src/types/role.type';

// req
export interface IGetByIdReq extends Pick<IRole, 'id'> {}
export interface ICreateReq extends Pick<IRole, 'name' | 'claims'> {}
export interface IEditReq extends IRole {}
export interface IDeleteReq extends Pick<IRole, 'id'> {}

// res
export interface IGetAllRes extends Pick<IRole, 'id' | 'name'> {}
export interface IGetByIdRes extends Pick<IRole, 'id' | 'name'> {
  claims: IClaim[];
}