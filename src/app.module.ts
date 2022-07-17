import { Module } from '@nestjs/common';
import { AlbumModule } from './albums/album.module';
import { ArtistModule } from './artists/artist.module';
import { TrackModule } from './tracks/track.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule, TrackModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
