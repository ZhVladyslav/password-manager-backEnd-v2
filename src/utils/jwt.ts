import * as jsonwebtoken from 'jsonwebtoken';

class Jwt {
  //
  generate = ({ userId, tokenId }: { tokenId: string; userId: string }): string => {
    const accessToken = jsonwebtoken.sign(
      {
        tokenId,
        userId,
      },
      process.env.JWT_KEY,
      { expiresIn: '1y' },
    );

    return accessToken;
  };

  //
  verify(token: string) {
    return jsonwebtoken.verify(token, process.env.JWT_KEY);
  }
}

export const jwt = new Jwt()