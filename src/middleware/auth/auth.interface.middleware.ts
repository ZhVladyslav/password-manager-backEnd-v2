/* ----------------  user token interface  ---------------- */

export interface IUserToken {
  tokenId: string;
  userId: string;
  iat: number;
  exp: number;
}
