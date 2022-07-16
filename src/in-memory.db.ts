import { Injectable } from '@nestjs/common';
import Artist from './artists/artist.entity';
import User from './users/user.entity';

@Injectable()
class Database {
  users: User[] = [];
  artists: Artist[] = [];
}

const inMemoryDB = new Database();

export default inMemoryDB;