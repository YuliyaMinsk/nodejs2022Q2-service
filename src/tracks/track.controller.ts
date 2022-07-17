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
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
import Track from './track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Track {
    return this.trackService.findOne(id);
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() UpdateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, UpdateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.trackService.delete(id);
  } 
}
