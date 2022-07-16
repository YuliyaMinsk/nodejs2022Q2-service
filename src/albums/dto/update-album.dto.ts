
import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}

/*
interface Album { 
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
*/
