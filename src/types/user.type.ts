export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
  createDate: Date;
}

/**
  database interfaces
*/

// FIND
export interface IUserDbFindByLogin extends Pick<IUser, 'login'> {}
export interface IUserDbFindById extends Pick<IUser, 'id'> {}

// CREATE
export interface IUserDbCreate extends Pick<IUser, 'name' | 'login' | 'password'> {}

// UPDATE
export interface IUserDbUpdateName extends Pick<IUser, 'id' | 'name'> {}
export interface IUserDbUpdatePassword extends Pick<IUser, 'id' | 'password'> {}

// DELETE
export interface IUserDbDelete extends Pick<IUser, 'id'> {}

/**
  service interfaces
*/

// // FIND
// export interface IUserFindByLogin extends Pick<IUser, 'login'> {}
// export interface IUserFindById extends Pick<IUser, 'id'> {}

// // CREATE
// export interface IUserCreate extends Pick<IUser, 'name' | 'login' | 'password'> {}

// // UPDATE
// export interface IUserUpdateName extends Pick<IUser, 'id' | 'name'> {}
// export interface IUserUpdatePassword extends Pick<IUser, 'id' | 'password'> {}

// // DELETE
// export interface IUserDelete extends Pick<IUser, 'id'> {}
