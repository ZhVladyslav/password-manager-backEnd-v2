import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RoleController } from './settings.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session.middleware';
import { SettingsDbService } from './settings.db.service';
import { SettingsService } from './settings.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [SettingsService, SettingsDbService],
  controllers: [RoleController],
})
export class SettingsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(RoleController);
  }
}
