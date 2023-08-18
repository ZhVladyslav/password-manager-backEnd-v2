import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PassCollectionModule } from './pass-collection/pass-collection.module';

@Module({
  imports: [AuthModule, PassCollectionModule],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
