import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from 'src/albums/album.service';
import { ArtistService } from 'src/artists/artist.service';
import { TrackService } from 'src/tracks/track.service';
import { validate } from 'uuid';
import Favorites from './favorite.entity';

@Injectable()
export class FavoriteService {
  private static db: Favorites = {
    artists: new Array<string>(),
    albums: new Array<string>(),
    tracks: new Array<string>(),
  };

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  findAll() {
    console.log('TEST ===============================================', FavoriteService.db)
    return {
      tracks: FavoriteService.db.tracks.map(
        async (trackId) => {
          const result = await this.trackService.findOne(trackId);
          console.log('TRACK: ', result);
          return result;
        }
      ),
      albums: FavoriteService.db.albums.map(
        async (albumId) => await this.albumService.findOne(albumId),
      ),
      artists: FavoriteService.db.artists.map(
        async (artistId) => await this.artistService.findOne(artistId),
      ),
    };
  }

  async addAlbum(id: string) {
    const album = await this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException();
    }

    FavoriteService.db.albums.push(id);
    return album || null;
  }

  removeAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    FavoriteService.db.albums = FavoriteService.db.albums.filter(
      (el) => el !== id,
    );
    return id;
  }

  async addTrack(id: string) {
    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new NotFoundException();
    }

    FavoriteService.db.tracks.push(id);
    return track || null;
  }

  removeTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    FavoriteService.db.tracks = FavoriteService.db.tracks.filter(
      (el) => el !== id,
    );
    return id;
  }

  async addArtist(id: string) {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException();
    }

    FavoriteService.db.artists.push(id);
    return artist || null;
  }

  removeArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    FavoriteService.db.artists = FavoriteService.db.artists.filter(
      (el) => el !== id,
    );
    return id;
  }
}
