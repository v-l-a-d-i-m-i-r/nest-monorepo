import { IsDateString, IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UserCreatedEvent {
  @IsMongoId()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;

  @IsDateString()
  public createdAt: string;
}
