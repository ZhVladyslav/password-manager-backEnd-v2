import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session/session.middleware';
import { RoleMiddleware } from 'src/middleware/role/role.middleware';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware, RoleMiddleware).forRoutes(StatisticsController);
  }
}
