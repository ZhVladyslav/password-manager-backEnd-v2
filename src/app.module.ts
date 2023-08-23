import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PassCollectionModule } from './modules/pass-collection/pass-collection.module';
import { SessionModule } from './modules/session/session.module';
import { UserModule } from './modules/user/user.module';
import { UserConfigModule } from './modules/user-config/user-config.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { SettingsServerModule } from './modules/settings-server/settings-server.module';
import { IssueModule } from './modules/issue/issue.module';
import { IssueCommentModule } from './modules/issue-comment/issue-comment.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    AuthModule,
    PassCollectionModule,
    SessionModule,
    UserModule,
    UserConfigModule,
    StatisticsModule,
    SettingsServerModule,
    IssueModule,
    IssueCommentModule,
    RoleModule,
  ],
  exports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
