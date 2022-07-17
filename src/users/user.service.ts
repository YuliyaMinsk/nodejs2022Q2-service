import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import User from './user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import DatabaseService from 'src/db/in-memory.db.service';

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor(private db: DatabaseService<User>,) {}

  findAll(): User[] {
    return this.db.findAll();
  }

  findOne(id: string): User {
    const user = this.db.findOne(id);

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

    this.db.create(newUser);

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
      throw new ForbiddenException('You put wrong old password');
    }

    Object.assign(userToUpdate, {
      password: newPassword,
      version: userToUpdate.version + 1,
      updatedAt: Date.now(),
    });

    return this.db.update(id, userToUpdate);
  }

  delete(id: string) {
    const userToDelete = this.db.delete(id);

    if (!validate(id)) {
      throw new BadRequestException();
    }

    if (!userToDelete) {
      throw new NotFoundException();
    }

    return userToDelete;
  }
}
