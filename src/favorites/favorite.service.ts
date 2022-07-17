import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import inMemoryDB from 'src/in-memory.db';
import Favorite from './favorite.entity';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
/*
@Injectable()
export class FavoriteService {
  private readonly favorites: Favorite[];

  constructor() {
    this.favorites = inMemoryDB.getInstance().favorites;
  }    

  findAll(): Favorite[] {
    return this.favorites;
  }

  findOne(id: string): Favorite {
    const favorite = this.favorites.find((favorite) => favorite.id === id)

    if (!validate(id)) {
      throw new BadRequestException();
    }

    if (!favorite) {
      throw new NotFoundException();
    }

    return favorite || null;
  }

  create(createFavoriteDto: CreateFavoriteDto) {

    const newFavorite = new Favorite();

    newFavorite.id = v4();
    newFavorite.login = createFavoriteDto.login;
    newFavorite.password = createFavoriteDto.password;
    newFavorite.version = 1;
    newFavorite.createdAt = Date.now();
    newFavorite.updatedAt = Date.now();

    this.favorites.push(newFavorite);

    return newFavorite;
  }

  updateFavorite(id: string, UpdateFavoriteDto: UpdateFavoriteDto) {
    const favoriteToUpdate = this.findOne(id);

    if (!favoriteToUpdate) {
      throw new NotFoundException();
    }

    const { oldFavorite, newFavorite } = UpdateFavoriteDto;
    
    if (oldFavorite === newFavorite) {
      throw new BadRequestException();
    }

    if (oldFavorite !== favoriteToUpdate.password) {
      throw new ForbiddenException('You put wrong old password')
    }

    Object.assign(favoriteToUpdate, {
      password: newFavorite,
      version: favoriteToUpdate.version + 1,
      updatedAt: Date.now(),
    });

    return favoriteToUpdate || null;
  }

  delete(id: string) {
    const favoriteToDelete = this.findOne(id);

    if (!favoriteToDelete) {
      throw new NotFoundException();
    }

    const index = this.favorites.findIndex((favorite) => {
      return favorite.id === favoriteToDelete.id;
    });

    this.favorites.splice(index, 1);

    return favoriteToDelete || null;
  }
}
*/
