import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PassCollectionController } from './pass-collection/pass-collection.controller';
import { PassCollectionService } from './pass-collection/pass-collection.service';
import { PassCollectionModule } from './pass-collection/pass-collection.module';

@Module({
  imports: [AuthModule, PassCollectionModule],
  exports: [],
  controllers: [AppController, PassCollectionController],
  providers: [AppService, PassCollectionService],
})
export class AppModule {}
