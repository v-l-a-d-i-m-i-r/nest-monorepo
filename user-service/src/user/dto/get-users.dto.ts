import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

import { BaseUserResponse } from './base-user.dto';
import { BasePaginatedResponse, PaginatesResponseMeta } from '../../utils/base-paginated-response';

export class GetUsersQuery {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => value && parseInt(value))
  public page?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => value && parseInt(value))
  public limit?: number;
}

export class GetUsersResponse extends BasePaginatedResponse<BaseUserResponse[]> {
  @ApiProperty({ type: BaseUserResponse, isArray: true })
  public data: BaseUserResponse[];

  @ApiProperty({ type: PaginatesResponseMeta })
  public meta: PaginatesResponseMeta;
}
