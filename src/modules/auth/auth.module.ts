import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './auth.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
