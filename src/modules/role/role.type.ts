import { IClaim, IRole } from 'src/types/role.type';

interface IClaimsInRoleRes extends Pick<IClaim, 'id' | 'name'> {}

// req
export interface IGetByIdReq extends Pick<IRole, 'id'> {}
export interface ICreateReq extends Pick<IRole, 'name' | 'claims'> {}
export interface IEditReq extends IRole {}
export interface IDeleteReq extends Pick<IRole, 'id'> {
  newRoleId: string | null;
}

// res
export interface IGetAllRes extends Pick<IRole, 'id' | 'name'> {}
export interface IGetByIdRes extends Pick<IRole, 'id' | 'name'> {
  claims: IClaimsInRoleRes[];
}
