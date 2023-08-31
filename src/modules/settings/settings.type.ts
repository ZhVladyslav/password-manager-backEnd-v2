import { IRole } from 'src/types/role.type';

// req
export interface ICreateReq extends Pick<IRole, 'name' | 'claims'> {}

// res
export interface IGetAllRes extends Pick<IRole, 'id' | 'name'> {}
