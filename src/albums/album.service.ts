import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { v4, validate } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import inMemoryDB from 'src/in-memory.db';
import Album from './album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  private readonly albums: Album[];

  constructor() {
    this.albums = inMemoryDB.albums;
  }    

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    const album = this.albums.find((album) => album.id === id)

    if (!validate(id)) {
      throw new BadRequestException();
    }

    if (!album) {
      throw new NotFoundException();
    }

    return album || null;
  }

  create(createAlbumDto: CreateAlbumDto) {

    const newAlbum = new Album();

    newAlbum.id = v4();
    newAlbum.name = createAlbumDto.name;
    newAlbum.year = createAlbumDto.year;
    newAlbum.artistId = createAlbumDto.artistId;

    this.albums.push(newAlbum);

    return newAlbum;
  }

  update(id: string, UpdateAlbumDto: UpdateAlbumDto) {
    const albumToUpdate = this.findOne(id);

    if (!albumToUpdate) {
      throw new NotFoundException();
    }

    const { name, year, artistId } = UpdateAlbumDto;
    
    Object.assign(albumToUpdate, {
      name: name,
      year: year,
      artistId: artistId,
    });

    return albumToUpdate || null;
  }

  delete(id: string) {
    const albumToDelete = this.findOne(id);

    if (!albumToDelete) {
      throw new NotFoundException();
    }

    const index = this.albums.findIndex((album) => {
      return album.id === albumToDelete.id;
    });

    this.albums.splice(index, 1);

    return albumToDelete || null;
  }
}
