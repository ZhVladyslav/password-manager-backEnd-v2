import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; // Import your LoginDto
import { BadRequestException, ConflictException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { UserDbService } from '../../database/user.db.service';
import { SessionDbService } from '../../database/session.db.service';
import { DatabaseService } from '../../database/database.service';
import { RegistrationDto } from './dto/registration.dto';
import { validate } from 'class-validator';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  const mockUserData = {
    name: 'Alex',
    login: 'Jobsscjlds',
    password: 'P@ssw0rd6745',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserDbService, SessionDbService, DatabaseService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('Registration', () => {
    // it('registration', async () => {
    //   const registrationDto: RegistrationDto = mockUserData;
    //   const result = await authController.registration(registrationDto);
    //   expect(result).toStrictEqual({ message: 'User is create' });
    // });

    // it('invalid request data', async () => {
    //   const registrationDto: RegistrationDto = {
    //     name: '',
    //     login: '',
    //     password: 'Password',
    //   };

    //   const validationErrors = await validate(new RegistrationDto(registrationDto));
    //   console.log(validationErrors);
      

    //   try {
    //     await authController.registration(registrationDto);
    //   } catch (error) {
    //     console.log(error.response);
    //   }
    // });

    it('user is exist', async () => {
      try {
        const registrationDto: RegistrationDto = mockUserData;
        await authController.registration(registrationDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.response.message).toBe('User with this login already exists');
        expect(error.response.error).toBe('Conflict');
        expect(error.response.statusCode).toBe(409);
      }
    });
  });

  // describe('Login', () => {
  //   it('valid', async () => {
  //     const loginDto: LoginDto = { login: mockUserData.login, password: mockUserData.password };
  //     const result = await authController.login(loginDto);
  //     expect(result).toStrictEqual({ token: 'User is create' });
  //   });
  // });
});
