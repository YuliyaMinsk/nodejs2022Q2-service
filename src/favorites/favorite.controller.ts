import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoriteService } from './favorite.service';
import Favorites from './favorite.entity';

@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    //return this.favoriteService.findOne(id);
  }

  @Put()
  addAlbum(@Body() createFavoriteDto: CreateFavoriteDto) {
    //return this.favoriteService.add(createFavoriteDto);
  }

  @Put()
  removeAlbum(@Body() createFavoriteDto: CreateFavoriteDto) {
    //return this.favoriteService.remove(createFavoriteDto);
  }


  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.favoriteService.delete(id);
  }
}
