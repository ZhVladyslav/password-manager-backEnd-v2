export interface IRole {
  id: string;
  name_en: string;
  name_ua: string;
  name_ru: string;
  description_en: string;
  description_ua: string;
  description_ru: string;
  createDate: Date;
  lastUpdate: Date;
}

/**
  database interfaces
*/

// FIND
export interface IRoleDbFindById extends Pick<IRole, 'id'> {}
export interface IRoleDbFindByName extends Pick<IRole, 'name_en'> {}

// CREATE
export interface IRoleDbCreate extends Omit<IRole, 'id' | 'createDate' | 'lastUpdate'> {}

// UPDATE
export interface IRoleDbUpdate extends Omit<IRole, 'createDate' | 'lastUpdate'> {}

// DELETE
export interface IRoleDbDelete extends Pick<IRole, 'id'> {}

/**
  service interfaces
*/
