import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { IssueController } from './issue.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session/session.middleware';
import { RoleMiddleware } from 'src/middleware/role/role.middleware';
import { IssueService } from './issue.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [IssueService],
  controllers: [IssueController],
})
export class IssueModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(IssueController);
    consumer.apply(AuthMiddleware, SessionMiddleware, RoleMiddleware).forRoutes('/issue/complete');
  }
}
