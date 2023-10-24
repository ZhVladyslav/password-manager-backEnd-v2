import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UserDbService } from './user.db.service';
import { SessionDbService } from './session.db.service';
import { RoleDbService } from './role.db.service';
import { ClaimDbService } from './claim.db.service';
import { PassCollectionDbService } from './passCollection.db.service';
import { RoleToUserDbService } from './roleToUser.db.service';

@Module({
  imports: [],
  exports: [
    DatabaseService,
    UserDbService,
    SessionDbService,
    RoleDbService,
    RoleToUserDbService,
    ClaimDbService,
    PassCollectionDbService,
  ],
  providers: [
    DatabaseService,
    UserDbService,
    SessionDbService,
    RoleDbService,
    RoleToUserDbService,
    ClaimDbService,
    PassCollectionDbService,
  ],
  controllers: [],
})
export class DatabaseModule {}
