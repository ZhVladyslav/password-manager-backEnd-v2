import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { IssueCommentController } from './issue-comment.controller';
import { DatabaseModule } from 'src/database/database.module';
import { SessionMiddleware } from 'src/middleware/session/session.middleware';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';
import { IssueCommentService } from './issue-comment.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [IssueCommentService],
  controllers: [IssueCommentController],
})
export class IssueCommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(IssueCommentController);
  }
}
