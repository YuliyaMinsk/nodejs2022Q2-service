import { Module } from '@nestjs/common';
import { PrismaDBService } from 'src/prisma-db/prisma-db.service'
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaDBService],
  exports: [UserService],
})
export class UserModule {}
