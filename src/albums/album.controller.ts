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
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumService } from './album.service';
import Album from './album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
 constructor(private albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Album {
    return this.albumService.findOne(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() UpdateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, UpdateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.albumService.delete(id);
  }
}
