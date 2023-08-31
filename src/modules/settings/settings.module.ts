import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RoleController } from './settings.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session.middleware';
import { SettingsService } from './settings.service';
import { RoleDbService } from '../role/role.db.service';
import { UserDbService } from '../user/user.db.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [SettingsService, RoleDbService, UserDbService],
  controllers: [RoleController],
})
export class SettingsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(RoleController);
  }
}
