import { Module } from '@nestjs/common';

import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  providers: [EmailController, EmailService],
})
export class EmailModule {}
