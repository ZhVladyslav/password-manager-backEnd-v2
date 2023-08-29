import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './auth.service';
import { AuthDbService } from './auth.db.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [AuthService, AuthDbService],
  controllers: [AuthController],
})
export class AuthModule {}
