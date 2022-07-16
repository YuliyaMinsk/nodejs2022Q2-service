import { Module } from '@nestjs/common';
import { ArtistController } from './artists/artist.controller';
import { ArtistService } from './artists/artist.service';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';

@Module({
  imports: [],
  controllers: [UserController, ArtistController],
  providers: [UserService, ArtistService],
  exports: [],
})
export class AppModule {}
