export interface IClaim {
  id: string;
  roleId: string;
  claim: string;
  createDate: Date;
}

/**
  database interfaces
*/

// FIND
export interface IClaimDbFindByRoleId extends Pick<IClaim, 'roleId'> {}

// CREATE
export interface IClaimDbCreate extends Pick<IClaim, 'roleId'> {
  claims: string[];
}

// DELETE
export interface IClaimDbDelete extends Pick<IClaim, 'roleId'> {}

/**
  service interfaces
*/
