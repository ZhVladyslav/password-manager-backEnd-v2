export interface IUserToken {
  sessionId: string;
  tokenId: string;
  userId: string;
  iat: number;
  exp: number;
}
