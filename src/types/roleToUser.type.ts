export interface IRoleToUser {
  id: string;
  roleId: string;
  userId: string;
}

/**
  database interfaces
*/

// FIND
export interface IRoleToUserDbFindById extends Pick<IRoleToUser, 'id'> {}
export interface IRoleToUserDbFindByUserId extends Pick<IRoleToUser, 'userId'> {}

// CREATE
export interface IRoleToUserDbCreate extends Pick<IRoleToUser, 'roleId' | 'userId'> {}

// UPDATE
export interface IRoleToUserDbUpdate extends Pick<IRoleToUser, 'id' | 'roleId'> {}

// DELETE
export interface IRoleToUserDbDelete extends Pick<IRoleToUser, 'id'> {}

/**
  service interfaces
*/
