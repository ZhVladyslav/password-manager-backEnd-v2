import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

/* ----------------  payload jwt interface  ---------------- */
interface IGenerateJwt {
  tokenId: string;
  userId: string;
}

@Injectable()
export class AuthJwtService {
  /* ----------------  Generate jwt  ---------------- */
  generateJwt = ({ userId, tokenId }: IGenerateJwt): string => {
    const accessToken = jwt.sign(
      {
        tokenId,
        userId,
      },
      process.env.JWT_KEY,
      { expiresIn: '1y' },
    );

    return accessToken;
  };
}
