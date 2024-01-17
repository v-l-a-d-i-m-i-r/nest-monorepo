import { Injectable } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import { UserCreatedEvent } from './dto/user-created.dto';
import { UserDeletedEvent } from './dto/user-deleted.dto';
import { EmailService } from './email.service';
import { UserTopics } from '../const/topics';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class EmailController {
  public constructor(
    private readonly emailService: EmailService,
    private readonly logger: LoggerService,
  ) {}

  @RMQValidate()
  @RMQRoute(UserTopics.UserCreated)
  public async onUserCreated(event: UserCreatedEvent): Promise<void> {
    try {
      await this.emailService.sendUserCreatedEmail(event);
    } catch (error) {
      this.logger.error('EmailController.onUserCreated', error);
      throw error;
    }
  }

  @RMQValidate()
  @RMQRoute(UserTopics.UserDeleted)
  public async onUserDeleted(event: UserDeletedEvent): Promise<void> {
    try {
      await this.emailService.sendUserDeletedEmail(event);
    } catch (error) {
      this.logger.error('EmailController.onUserDeleted', error);
      throw error;
    }
  }
}
