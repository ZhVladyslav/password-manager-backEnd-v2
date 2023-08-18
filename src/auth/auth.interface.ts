/* ----------------  Generate jwt  ---------------- */
export interface IGenerateJwt {
  userId: string;
}

/* ----------------  Check password  ---------------- */
export interface ICheckPassword {
  getPassword: string;
  userPassword: string;
}
