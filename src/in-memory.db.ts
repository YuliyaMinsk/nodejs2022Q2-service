import { Injectable } from '@nestjs/common';
import User from './users/user.entity';

@Injectable()
export default class InMemoryDB {
  users: User[] = [];
}