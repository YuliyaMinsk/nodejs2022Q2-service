import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { v4, validate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import InMemoryDB from 'src/in-memory.db';
import User from './user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  private readonly inMemoryDB: InMemoryDB;

  constructor() {
    this.inMemoryDB = new InMemoryDB();
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

  updatePassword(id: string, UpdatePasswordDto: UpdatePasswordDto) {
    const userToUpdate = this.findOne(id);

    if (!userToUpdate) {
      throw new NotFoundException();
    }

    const { oldPassword, newPassword } = UpdatePasswordDto;
    
    if (oldPassword === newPassword) {
      throw new BadRequestException();
    }

    if (oldPassword !== userToUpdate.password) {
      throw new ForbiddenException('You put wrong old password')
    }

    Object.assign(userToUpdate, {
      password: newPassword,
      version: userToUpdate.version + 1,
      updatedAt: Date.now(),
    });

    return userToUpdate || null;
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