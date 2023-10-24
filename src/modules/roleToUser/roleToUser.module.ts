import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RoleToUserController } from './roleToUser.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session.middleware';
import { RoleToUserService } from './roleToUser.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [RoleToUserService],
  controllers: [RoleToUserController],
})
export class RoleToUserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(RoleToUserController);
  }
}
