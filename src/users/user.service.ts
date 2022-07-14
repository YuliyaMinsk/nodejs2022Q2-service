import { Injectable } from '@nestjs/common';
import User from './user.interface';

@Injectable()
export class UserService {
  private readonly cats: User[] = [];

  create(cat: User) {
    this.cats.push(cat);
  }

  findAll(): User[] {
    return this.cats;
  }
}