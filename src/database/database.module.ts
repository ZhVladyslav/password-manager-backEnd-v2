import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UserDbService } from './user.db.service';
import { SessionDbService } from './session.db.service';
import { RoleDbService } from './role.db.service';
import { ClaimDbService } from './claim.db.service';
import { PassCollectionDbService } from './passCollection.db.service';

@Module({
  imports: [],
  exports: [DatabaseService, UserDbService, SessionDbService, RoleDbService, ClaimDbService, PassCollectionDbService],
  providers: [DatabaseService, UserDbService, SessionDbService, RoleDbService, ClaimDbService, PassCollectionDbService],
  controllers: [],
})
export class DatabaseModule {}
