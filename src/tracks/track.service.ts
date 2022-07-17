import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import inMemoryDB from 'src/in-memory.db';
import Track from './track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  private readonly tracks: Track[];

  constructor() {
    this.tracks = inMemoryDB.getInstance().tracks;
  }

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);

    if (!validate(id)) {
      throw new BadRequestException();
    }

    if (!track) {
      throw new NotFoundException();
    }

    return track || null;
  }

  create(createTrackDto: CreateTrackDto) {
    const newTrack = new Track();

    newTrack.id = v4();
    newTrack.name = createTrackDto.name;
    newTrack.artistId = createTrackDto.artistId;
    newTrack.albumId = createTrackDto.albumId;
    newTrack.duration = createTrackDto.duration;

    this.tracks.push(newTrack);

    return newTrack;
  }

  update(id: string, UpdateTrackDto: UpdateTrackDto) {
    const trackToUpdate = this.findOne(id);

    if (!trackToUpdate) {
      throw new NotFoundException();
    }

    const { name, artistId, albumId, duration } = UpdateTrackDto;

    Object.assign(trackToUpdate, {
      name: name,
      artistId: artistId,
      albumId: albumId,
      duration: duration,
    });

    return trackToUpdate || null;
  }

  delete(id: string) {
    const trackToDelete = this.findOne(id);

    if (!trackToDelete) {
      throw new NotFoundException();
    }

    const index = this.tracks.findIndex((track) => {
      return track.id === trackToDelete.id;
    });

    this.tracks.splice(index, 1);

    return trackToDelete || null;
  }
}
