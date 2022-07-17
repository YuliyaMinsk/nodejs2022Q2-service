import { Module, forwardRef } from '@nestjs/common';
import DatabaseService from 'src/db/in-memory.db.service';
import { AlbumModule } from 'src/albums/album.module';
import { ArtistModule } from 'src/artists/artist.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  imports: [forwardRef(() => ArtistModule), forwardRef(() => AlbumModule)],
  providers: [TrackService, DatabaseService],
  exports: [TrackService],
})
export class TrackModule {}
