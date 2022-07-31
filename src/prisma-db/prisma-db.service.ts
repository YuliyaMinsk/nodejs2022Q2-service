import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaDBService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://rest-server-user:rest-server-password@database:5432/rest-server-db?schema=public',
        },
      },
    });
  }
}
