export interface IPassCollection {
  id: string;
  userId: string;
  version: string;
  name: string;
  encryptData: string;
  createDate: Date;
  lastUpdate: Date;
}

/**
  database interfaces
*/

// FIND
export interface IPassCollectionDbFindAll extends Pick<IPassCollection, 'userId'> {}
export interface IPassCollectionDbFindById extends Pick<IPassCollection, 'id' | 'userId'> {}
export interface IPassCollectionDbFindByName extends Pick<IPassCollection, 'userId' | 'name'> {}

// CREATE
export interface IPassCollectionDbCreate extends Pick<IPassCollection, 'userId' | 'version' | 'name' | 'encryptData'> {}

// UPDATE
export interface IPassCollectionDbUpdateName extends Pick<IPassCollection, 'id' | 'userId' | 'name'> {}
export interface IPassCollectionDbUpdateData extends Pick<IPassCollection, 'id' | 'userId' | 'encryptData'> {}

// DELETE
export interface IPassCollectionDbDeleteById extends Pick<IPassCollection, 'id' | 'userId'> {}
export interface IPassCollectionDbDeleteAll extends Pick<IPassCollection, 'userId'> {}

/**
  service interfaces
*/
