import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import InMemoryDB from 'src/in-memory.db';
import User from './user.entity';

@Injectable()
export class UserService {
  private readonly inMemoryDB: InMemoryDB;

  constructor() {
    this.inMemoryDB = new InMemoryDB();
  }  

  create(createUserDto: CreateUserDto) {

    const newUser = new User();

    newUser.id = v4();
    newUser.login = createUserDto.login;
    newUser.password = createUserDto.password;
    newUser.version = 1;
    newUser.createdAt = Date.now();
    newUser.updatedAt = Date.now();

    this.inMemoryDB.users.push(newUser);

    return newUser;
  }

  findAll(): User[] {
    console.log(this.inMemoryDB);
    return this.inMemoryDB.users;
  }
}
