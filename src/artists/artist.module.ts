import { Module, forwardRef } from '@nestjs/common';
import DatabaseService from 'src/db/in-memory.db.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { AlbumModule } from 'src/albums/album.module';
import { TrackModule } from 'src/tracks/track.module';

@Module({
  controllers: [ArtistController],
  imports: [forwardRef(() => AlbumModule), forwardRef(() => TrackModule)],
  providers: [ArtistService, DatabaseService],
  exports: [ArtistService],
})
export class ArtistModule {}
