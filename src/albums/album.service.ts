import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import Album from './album.entity';
import DatabaseService from 'src/db/in-memory.db.service';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from 'src/tracks/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private db: DatabaseService<Album>,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    ) {}

  findAll(): Album[] {
    return this.db.findAll();
  }

  findOne(id: string): Album {
    const album = this.db.findOne(id);

    if (!validate(id)) {
      throw new BadRequestException();
    }

    if (!album) {
      throw new NotFoundException();
    }

    return album || null;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new Album();

    newAlbum.id = v4();
    newAlbum.name = createAlbumDto.name;
    newAlbum.year = createAlbumDto.year;
    newAlbum.artistId = createAlbumDto.artistId;

    this.db.create(newAlbum);

    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumToUpdate = this.findOne(id);

    if (!albumToUpdate) {
      throw new NotFoundException();
    }

    const { name, year, artistId } = updateAlbumDto;

    Object.assign(albumToUpdate, {
      name: name,
      year: year,
      artistId: artistId,
    });

    return this.db.update(id, albumToUpdate);
  }

  delete(id: string) {
    const albumToDelete = this.db.delete(id);

    if (!validate(id)) {
      throw new BadRequestException();
    }

    if (!albumToDelete) {
      throw new NotFoundException();
    }

    this.trackService.removeIds(id, { albumId: null });

    return albumToDelete || null;
  }

  removeIds(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albums = this.db.findAll();
    let count = 0;

    albums.forEach((album) => {
      if (id === album.artistId) {
        this.db.update(album.id, updateAlbumDto);
        count++;
      }
    });

    return count;
  }
}
