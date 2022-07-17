import { Exclude } from 'class-transformer';

export default class User {
  id: string; // uuid v4
  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
