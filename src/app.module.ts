import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PassCollectionModule } from './pass-collection/pass-collection.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, PassCollectionModule, SessionModule, UserModule],
  exports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
