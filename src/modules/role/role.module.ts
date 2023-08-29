import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session.middleware';
import { RoleDbService } from './role.db.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [RoleService, RoleDbService],
  controllers: [RoleController],
})
export class RoleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(RoleController);
  }
}
