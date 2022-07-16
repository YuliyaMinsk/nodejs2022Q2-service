import { Injectable } from '@nestjs/common';
import Album from './albums/album.entity';
import Artist from './artists/artist.entity';
import Favorites from './favorites/favorite.entity';
import Track from './tracks/track.entity';
import User from './users/user.entity';

@Injectable()
class Database {
  users: User[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  favorites: Favorites[] = [];
}

const inMemoryDB = new Database();

export default inMemoryDB;