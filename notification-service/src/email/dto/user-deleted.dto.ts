import { IsDateString, IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UserDeletedEvent {
  @IsMongoId()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;

  @IsDateString()
  public deletedAt: string;
}
