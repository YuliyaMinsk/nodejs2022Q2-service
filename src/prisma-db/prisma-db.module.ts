import { Global, Module } from '@nestjs/common';
import { PrismaDBService } from './prisma-db.service';

@Global()
@Module({
  providers: [PrismaDBService],
  exports: [PrismaDBService],
})
export class PrismaDBModule {}