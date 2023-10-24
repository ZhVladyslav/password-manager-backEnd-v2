export interface ISession {
  id: string;
  userId: string;
  tokenId: string;
  createDate: Date;
  expDate: Date;
}

/**
  database interfaces
*/

// FIND
export interface ISessionDbFindAll extends Pick<ISession, 'userId'> {}
export interface ISessionDbFindById extends Pick<ISession, 'id' | 'userId'> {}
export interface ISessionDbFindByTokenId extends Pick<ISession, 'tokenId'> {}

// CREATE
export interface ISessionDbCreate extends Pick<ISession, 'userId' | 'tokenId' | 'expDate'> {}

// DELETE
export interface ISessionDbDeleteById extends Pick<ISession, 'id' | 'userId'> {}
export interface ISessionDbDeleteAll extends Pick<ISession, 'userId'> {}

/**
  service interfaces
*/
