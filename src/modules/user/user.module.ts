import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session.middleware';
import { UserService } from './user.service';
import { SessionService } from '../session/session.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [UserService, SessionService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(UserController);
  }
}
