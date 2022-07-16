import { IsInt, IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';
import { isNull } from 'node:util';


export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((_, value) => !isNull(value))
  @IsUUID('4')
  artistId: string;

  @ValidateIf((_, value) => !isNull(value))
  @IsUUID('4')
  albumId: string;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}

/*
interface Track { 
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
*/
