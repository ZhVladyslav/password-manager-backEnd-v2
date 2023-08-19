import { IsString } from 'class-validator';

// ----------------------------------------------------------------------

//
// Login
//

// ----------------------------------------------------------------------

//  Find user by login
export class LoginDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

// ----------------------------------------------------------------------

export class CreateSessionDto {
  @IsString()
  userId: string;

  @IsString()
  tokenId: string;
}

// ----------------------------------------------------------------------

//
// Registration
//

// ----------------------------------------------------------------------

// Create user
export class RegistrationDto {
  @IsString()
  name: string;

  @IsString()
  login: string;

  @IsString()
  password: string;
}

// ----------------------------------------------------------------------
