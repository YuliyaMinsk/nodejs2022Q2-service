import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @ValidateIf((album) => album.artistId !== null)
  @IsUUID('4')
  artistId: string;
}

/*
interface Album { 
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
*/
