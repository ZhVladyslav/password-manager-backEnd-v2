import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { SessionController } from './session.controller';
import { DatabaseModule } from 'src/database/database.module';
import { SessionService } from './session.service';
import { SessionMiddleware } from 'src/middleware/session.middleware';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [SessionService],
  controllers: [SessionController],
})
export class SessionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(SessionController);
  }
}
