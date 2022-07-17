import { Global, Module } from '@nestjs/common';
import DatabaseService from './in-memory.db.service';

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}