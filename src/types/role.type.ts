export interface IRole {
  id: string;
  name: string;
  claims: string[];
}

export interface IClaim {
  id: string;
  roleId: string;
  name: string;
}