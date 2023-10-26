export interface IRoleToUser {
  id: string;
  roleId: string;
  userId: string;
}

/**
  database interfaces
*/

// FIND
export interface IRoleToUser_FindById extends Pick<IRoleToUser, 'id'> {}
export interface IRoleToUser_FindByUserId extends Pick<IRoleToUser, 'userId'> {}

// CREATE
export interface IRoleToUser_Create extends Pick<IRoleToUser, 'roleId' | 'userId'> {}
export interface IRoleToUser_Set extends Pick<IRoleToUser, 'roleId' | 'userId'> {}

// UPDATE
export interface IRoleToUser_Update extends Pick<IRoleToUser, 'id' | 'roleId'> {}

// DELETE
export interface IRoleToUser_Delete extends Pick<IRoleToUser, 'id'> {}
export interface IRoleToUser_DeleteByRoleId extends Pick<IRoleToUser, 'roleId'> {}
export interface IRoleToUser_DeleteByUserId extends Pick<IRoleToUser, 'userId'> {}
