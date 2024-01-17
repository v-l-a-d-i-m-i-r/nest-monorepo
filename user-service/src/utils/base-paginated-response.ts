import { ApiProperty } from '@nestjs/swagger';

export class PaginatesResponseMeta {
  @ApiProperty({ description: 'Page', type: Number })
  public page: number;

  @ApiProperty({ description: 'Limit', type: Number })
  public limit: number;
}

export class BasePaginatedResponse<D> {
  public data: D;
  public meta: PaginatesResponseMeta;

  public constructor(data: D, meta: PaginatesResponseMeta) {
    this.data = data;
    this.meta = meta;
  }
}
