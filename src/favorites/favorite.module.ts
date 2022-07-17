import { Module, forwardRef } from "@nestjs/common";
import { AlbumModule } from "src/albums/album.module";
import { ArtistModule } from "src/artists/artist.module";
import { TrackModule } from "src/tracks/track.module";
import { FavoriteController } from "./favorite.controller";
import { FavoriteService } from "./favorite.service";

@Module({
  controllers: [FavoriteController],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}