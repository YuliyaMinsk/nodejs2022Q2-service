import { IsInt, IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';
import { isNull } from 'node:util';


export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @ValidateIf((_, value) => !isNull(value))
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
