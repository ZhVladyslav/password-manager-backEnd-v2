import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserConfigController } from './user-config.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session/session.middleware';
import { UserConfigService } from './user-config.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [UserConfigService],
  controllers: [UserConfigController],
})
export class UserConfigModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(UserConfigController);
  }
}
