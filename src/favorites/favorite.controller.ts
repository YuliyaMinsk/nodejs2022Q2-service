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
//import { FavoriteService } from './favorite.service';
import Favorite from './favorite.entity';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
/*
@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Favorite {
    return this.favoriteService.findOne(id);
  }

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @Put(':id')
  updateFavorite(@Param('id') id: string, @Body() UpdateFavoriteDto: UpdateFavoriteDto) {
    return this.favoriteService.updateFavorite(id, UpdateFavoriteDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.favoriteService.delete(id);
  }
}
*/
