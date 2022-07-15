import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4, validate } from 'uuid';
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
    return this.inMemoryDB.users;
  }

  findOne(id: string): User {
    const user = this.inMemoryDB.users.find((user) => user.id === id)

    if (!validate(id)) {
      throw new BadRequestException();
    }

    if (!user) {
      throw new NotFoundException();
    }

    return user || null;
  }

  delete(id: string) {
    const userToDelete = this.findOne(id);

    if (!userToDelete) {
      throw new NotFoundException();
    }

    const index = this.inMemoryDB.users.findIndex((user) => {
      return user.id === userToDelete.id;
    });

    this.inMemoryDB.users.splice(index, 1);

    return userToDelete || null;
  }
}
