import { Injectable } from '@nestjs/common';
import Album from './albums/album.entity';
import Artist from './artists/artist.entity';
import Favorites from './favorites/favorite.entity';
import Track from './tracks/track.entity';
import User from './users/user.entity';

@Injectable()
class InMemoryDB {
  users: User[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  favorites: Favorites[] = [];

  private static instance: InMemoryDB;

  public static getInstance(): InMemoryDB {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = new InMemoryDB();
    }

    return InMemoryDB.instance;
  }
}

export default InMemoryDB;
