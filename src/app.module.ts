import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PassCollectionModule } from './modules/pass-collection/pass-collection.module';
import { SessionModule } from './modules/session/session.module';
import { UserModule } from './modules/user/user.module';
import { SettingsServerModule } from './modules/settings-server/settings-server.module';
import { ErrorMiddleware } from './middleware/error.middleware';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    AuthModule,
    PassCollectionModule,
    SessionModule,
    UserModule,
    SettingsServerModule,
    RoleModule,
  ],
  exports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorMiddleware).forRoutes();
  }
}
