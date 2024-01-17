import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('/api/v1/health')
export class HealthController {
  @Get('/')
  @HttpCode(HttpStatus.OK)
  public async checkHealth(): Promise<void> {}
}
