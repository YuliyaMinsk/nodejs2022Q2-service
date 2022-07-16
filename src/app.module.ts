import { Module } from '@nestjs/common';
import { ArtistController } from './artists/artist.controller';
import { ArtistService } from './artists/artist.service';
import { TrackController } from './tracks/user.controller';
import { TrackService } from './tracks/user.service';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';

@Module({
  imports: [],
  controllers: [UserController, ArtistController, TrackController],
  providers: [UserService, ArtistService, TrackService],
  exports: [],
})
export class AppModule {}
