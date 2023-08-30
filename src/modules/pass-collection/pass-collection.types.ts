import { IPassCollection } from 'src/types/passCollection.type';

// req
export interface IGetAllReq extends Pick<IPassCollection, 'userId'> {}
export interface IGetByIdReq extends Pick<IPassCollection, 'id' | 'userId'> {}
export interface ICreateReq extends Pick<IPassCollection, 'userId' | 'name' | 'data'> {}
export interface IEditNameReq extends Pick<IPassCollection, 'id' | 'userId' | 'name'> {}
export interface IEditDataReq extends Pick<IPassCollection, 'id' | 'userId' | 'data'> {}
export interface IDeleteReq extends Pick<IPassCollection, 'userId'> {
  id: string[];
}
export interface IDeleteInDbReq extends Pick<IPassCollection, 'id' | 'userId'> {}

// res
export interface IGetAllRes extends Pick<IPassCollection, 'id' | 'name'> {}
export interface IGetByIdRes extends Pick<IPassCollection, 'id' | 'name' | 'data'> {}
export interface ICreateRes extends Pick<IPassCollection, 'id'> {}
