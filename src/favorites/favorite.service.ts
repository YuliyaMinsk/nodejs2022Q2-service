import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import Favorites from './favorite.entity';

@Injectable()
export class FavoriteService {
  private readonly favorites: Favorites[];

  constructor() {}   

  findAll(): Favorites[] {
    return this.favorites;
  }

  create(createFavoriteDto: CreateFavoriteDto) {


  }


  delete(id: string) {
    
  }
}
