import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import User from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaDBService } from 'src/prisma-db/prisma-db.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaDBService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

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

    this.prisma.user.create({ data: newUser });

    return newUser;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {

    const userToUpdate = await this.prisma.user.findUnique({ where: { id } });

    if (!userToUpdate) {
      throw new NotFoundException();
    }

    const { oldPassword, newPassword } = updatePasswordDto;

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

    await this.prisma.user.updateMany ({
      where: { id },
      data: userToUpdate,
    });

    return userToUpdate;
  }

  async delete(id: string) {
    const userToDelete = await this.prisma.user.findUnique({ where: { id } });

    if (!validate(id)) {
      throw new BadRequestException();
    }

    if (!userToDelete) {
      throw new NotFoundException();
    }

    await this.prisma.user.delete({ where: { id } });

    return userToDelete;
  }
}
