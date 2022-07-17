import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import inMemoryDB from 'src/in-memory.db';
import { v4, validate } from 'uuid';
import Artist from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[];

  constructor() {
    this.artists = inMemoryDB.getInstance().artists;
  }

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!validate(id)) {
      throw new BadRequestException();
    }

    if (!artist) {
      throw new NotFoundException();
    }

    return artist || null;
  }

  create(createArtistDto: CreateArtistDto) {
    const newArtist = new Artist();

    newArtist.id = v4();
    newArtist.name = createArtistDto.name;
    newArtist.grammy = createArtistDto.grammy;

    this.artists.push(newArtist);

    return newArtist;
  }

  update(id: string, UpdateArtistDto: UpdateArtistDto) {
    const artistToUpdate = this.findOne(id);

    if (!artistToUpdate) {
      throw new NotFoundException();
    }

    const { name, grammy } = UpdateArtistDto;

    Object.assign(artistToUpdate, {
      name: name,
      grammy: grammy,
    });

    return artistToUpdate || null;
  }

  delete(id: string) {
    const artistToDelete = this.findOne(id);

    if (!artistToDelete) {
      throw new NotFoundException();
    }

    const index = this.artists.findIndex((artist) => {
      return artist.id === artistToDelete.id;
    });

    this.artists.splice(index, 1);

    return artistToDelete || null;
  }
}
