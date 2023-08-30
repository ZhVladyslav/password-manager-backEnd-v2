import { ISession } from "src/types/session.type";

// req
export interface IGetAllReq extends Pick<ISession, 'userId'> {}
export interface IGetByIdReq extends Pick<ISession, 'id' | 'userId'> {}
export interface IDeleteAllReq extends Pick<ISession, 'userId'> {}
export interface IDeleteByIdReq extends Pick<ISession, 'id' | 'userId'> {}

// res
export interface IGetAllRes extends Pick<ISession, 'id' | 'tokenId'> {}
export interface IGetByIdRes extends Pick<ISession, 'id' | 'tokenId'> {}