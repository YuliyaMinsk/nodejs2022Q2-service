import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import Artist from './artist.entity';
import DatabaseService from 'src/db/in-memory.db.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[];

  constructor(private db: DatabaseService<Artist>,) {}

  findAll(): Artist[] {
    return this.db.findAll();
  }

  findOne(id: string): Artist {
    const artist = this.db.findOne(id);

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

    this.db.create(newArtist);

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

    return this.db.update(id, artistToUpdate);
  }

  delete(id: string) {
    const artistToDelete = this.db.delete(id);

    if (!validate(id)) {
      throw new BadRequestException();
    }

    if (!artistToDelete) {
      throw new NotFoundException();
    }

    // change id to null in albums and tracks
    // inMemoryDB.deleteArtist(id);

    return artistToDelete || null;
  } 
}
