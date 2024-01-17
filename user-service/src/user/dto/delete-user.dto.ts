import { IsMongoId } from 'class-validator';

export class DeleteUserParams {
  @IsMongoId()
  public id: string;
}
