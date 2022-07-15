import { Module } from '@nestjs/common';
import InMemoryDB from './in-memory.db';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class AppModule {}
