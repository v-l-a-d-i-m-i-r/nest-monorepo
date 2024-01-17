import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

import { BaseUserResponse } from './base-user.dto';
import { BaseResponse } from '../../utils/base-response';

export class GetUserParams {
  @IsMongoId()
  public id: string;
}

export class GetUserResponse extends BaseResponse<BaseUserResponse> {
  @ApiProperty({ type: BaseUserResponse })
  public data: BaseUserResponse;
}
