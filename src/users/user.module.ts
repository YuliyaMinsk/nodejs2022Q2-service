import { Module } from '@nestjs/common';
import DatabaseService from 'src/db/in-memory.db.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService],
  exports: [UserService],
})
export class UserModule {}
