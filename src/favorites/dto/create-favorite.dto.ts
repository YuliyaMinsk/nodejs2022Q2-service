import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class CreateFavoriteDto {
  @IsArray()
  @Type(() => String)
  artists: string[];

  @IsArray()
  @Type(() => String)
  albums: string[];

  @IsArray()
  @Type(() => String)
  tracks: string[];
}

/*
interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
*/
