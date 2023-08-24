import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PassCollectionModule } from './modules/pass-collection/pass-collection.module';
import { SessionModule } from './modules/session/session.module';
import { UserModule } from './modules/user/user.module';
import { SettingsServerModule } from './modules/settings-server/settings-server.module';

@Module({
  imports: [
    AuthModule,
    PassCollectionModule,
    SessionModule,
    UserModule,
    SettingsServerModule,
  ],
  exports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
