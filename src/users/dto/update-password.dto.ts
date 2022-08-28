import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

/*
interface UpdatePasswordDto {  
  oldPassword: string; // previous password
  newPassword: string; // new password
}
*/
