export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
  roleId: string | null;
  createDate: Date;
}
