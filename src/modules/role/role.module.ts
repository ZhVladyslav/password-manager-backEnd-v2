import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RoleController } from './role.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session/session.middleware';
import { RoleService } from './role.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(RoleController);
  }
}
