import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from 'src/albums/album.service';
import { ArtistService } from 'src/artists/artist.service';
import { TrackService } from 'src/tracks/track.service';
import { v4, validate } from 'uuid';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import Favorites from './favorite.entity';

@Injectable()
export class FavoriteService {
  private readonly db: Favorites = {
    artists: new Array<string>,
    albums: new Array<string>,
    tracks: new Array<string>
  };

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {} 

  findAll(): Favorites {
    return this.db;
  }

  addAlbum(id: string) {
    const album = this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException();
    }

    this.db.albums.push(id);
    return { body: album };
  }

  removeAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    this.db.albums = this.db.albums.filter((el) => el !== id);
    return { statusCode: 204, message: 'Removed successfully' };
  }
}
