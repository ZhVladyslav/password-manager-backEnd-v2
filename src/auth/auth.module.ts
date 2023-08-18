import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthUuidService } from './auth.uuid.service';
import { AuthDatabaseService } from './auth.database.service';
import { AuthPasswordService } from './auth.password.service';
import { AuthJwtService } from './auth.jwt.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [AuthUuidService, AuthDatabaseService, AuthPasswordService, AuthJwtService],
  controllers: [AuthController],
})
export class AuthModule {}
