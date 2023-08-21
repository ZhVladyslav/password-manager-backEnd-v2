import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PassCollectionModule } from './pass-collection/pass-collection.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';
import { UserConfigModule } from './user-config/user-config.module';
import { StatisticsModule } from './statistics/statistics.module';
import { SettingsServerModule } from './settings-server/settings-server.module';
import { IssueModule } from './issue/issue.module';
import { IssueCommentModule } from './issue-comment/issue-comment.module';

@Module({
  imports: [AuthModule, PassCollectionModule, SessionModule, UserModule, UserConfigModule, StatisticsModule, SettingsServerModule, IssueModule, IssueCommentModule],
  exports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
