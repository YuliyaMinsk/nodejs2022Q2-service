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
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistService } from './artist.service';
import Artist from './artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Artist {
    return this.artistService.findOne(id);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() UpdatePasswordDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, UpdatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.artistService.delete(id);
  }
}
