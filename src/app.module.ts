import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ErrorMiddleware } from './middleware/error.middleware';
import { RoleModule } from './modules/role/role.module';
import { PassCollectionModule } from './modules/pass-collection/pass-collection.module';

@Module({
  imports: [AuthModule, UserModule, RoleModule, PassCollectionModule],
  exports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorMiddleware).forRoutes();
  }
}
