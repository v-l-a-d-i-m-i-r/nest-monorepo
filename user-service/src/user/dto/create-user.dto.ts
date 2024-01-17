import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { BaseUserResponse } from './base-user.dto';
import { BaseResponse } from '../../utils/base-response';

export class CreateUserBody {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;
}

export class CreateUserResponse extends BaseResponse<BaseUserResponse> {
  @ApiProperty({ type: BaseUserResponse })
  public data: BaseUserResponse;
}
