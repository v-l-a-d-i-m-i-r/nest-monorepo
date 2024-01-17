import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { BaseUserResponse } from './base-user.dto';
import { BaseResponse } from '../../utils/base-response';

export class UpdateUserBody {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name?: string;

  @IsOptional()
  @IsEmail()
  public email?: string;
}

export class UpdateUserParams {
  @IsMongoId()
  public id: string;
}

export class UpdateUserResponse extends BaseResponse<BaseUserResponse> {
  @ApiProperty({ type: BaseUserResponse })
  public data: BaseUserResponse;
}
