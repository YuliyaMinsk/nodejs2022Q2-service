import { Module, forwardRef } from '@nestjs/common';
import DatabaseService from 'src/db/in-memory.db.service';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { ArtistModule } from 'src/artists/artist.module';
import { TrackModule } from 'src/tracks/track.module';

@Module({
  controllers: [AlbumController],
  imports: [forwardRef(() => ArtistModule), forwardRef(() => TrackModule)],
  providers: [AlbumService, DatabaseService],
  exports: [AlbumService],
})
export class AlbumModule {}
