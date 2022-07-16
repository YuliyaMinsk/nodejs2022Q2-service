import { Module } from '@nestjs/common';
import { AlbumController } from './albums/album.controller';
import { AlbumService } from './albums/album.service';
import { ArtistController } from './artists/artist.controller';
import { ArtistService } from './artists/artist.service';
import { TrackController } from './tracks/track.controller';
import { TrackService } from './tracks/track.service';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';

@Module({
  imports: [],
  controllers: [UserController, ArtistController, TrackController, AlbumController],
  providers: [UserService, ArtistService, TrackService, AlbumService],
  exports: [],
})
export class AppModule {}
