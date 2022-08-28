import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((track) => track.artistId !== null)
  @IsUUID('4')
  artistId: string;

  @ValidateIf((track) => track.albumId !== null)
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
