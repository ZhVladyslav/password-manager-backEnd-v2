import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session/session.middleware';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(UserController);
  }
}
