import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import Track from './track.entity';
import DatabaseService from 'src/db/in-memory.db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private db: DatabaseService<Track>,) {}

  findAll(): Track[] {
    return this.db.findAll();
  }

  findOne(id: string): Track {
    const track = this.db.findOne(id);

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

    this.db.create(newTrack);

    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackToUpdate = this.findOne(id);

    if (!trackToUpdate) {
      throw new NotFoundException();
    }

    const { name, artistId, albumId, duration } = updateTrackDto;

    Object.assign(trackToUpdate, {
      name: name,
      artistId: artistId,
      albumId: albumId,
      duration: duration,
    });

    return this.db.update(id, trackToUpdate);
  }

  delete(id: string) {
    const trackToDelete = this.db.delete(id);

    if (!validate(id)) {
      throw new BadRequestException();
    }

    if (!trackToDelete) {
      throw new NotFoundException();
    }

    return trackToDelete || null;
  } 

  removeIds(id: string, updateTrackDto: UpdateTrackDto) {
    const tracks = this.db.findAll();
    const result = [];

    tracks.forEach((track) => {
      if ((id === track.artistId) || (id === track.albumId)) {
        result.push(this.db.update(track.id, updateTrackDto));
      }
    });

    return result;
  }
}
