import { Module } from '@nestjs/common';
import { SettingsServerService } from './settings-server.service';
import { SettingsServerController } from './settings-server.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [SettingsServerService],
  controllers: [SettingsServerController],
})
export class SettingsServerModule {}
