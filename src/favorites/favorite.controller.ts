import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(@Param('id') id: string) {
    return await this.favoriteService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    return this.favoriteService.removeAlbum(id);
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrack(@Param('id') id: string) {
    return await this.favoriteService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    return this.favoriteService.removeTrack(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(@Param('id') id: string) {
    return await this.favoriteService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    return this.favoriteService.removeArtist(id);
  }
}
