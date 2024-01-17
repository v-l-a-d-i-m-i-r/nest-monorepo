import { ApiProperty } from '@nestjs/swagger';

export class BaseUserResponse {
  @ApiProperty({ description: 'Identifier', type: String })
  public id: string;

  @ApiProperty({ description: 'Name', type: String })
  public name: string;

  @ApiProperty({ description: 'Email', type: String })
  public email: string;

  @ApiProperty({ description: 'Created At', type: String })
  public createdAt: string;

  @ApiProperty({ description: 'Updated At', type: String })
  public updatedAt: string;
}
