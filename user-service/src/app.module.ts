import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';

import { AMQP_EXCHANGE, AMQP_HOST, AMQP_USER, AMQP_PASSWORD, MONGO_URL } from './config/config';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    RMQModule.forRoot({
      exchangeName: AMQP_EXCHANGE,
      connections: [
        {
          login: AMQP_USER,
          password: AMQP_PASSWORD,
          host: AMQP_HOST,
        },
      ],
    }),
    HealthModule,
    LoggerModule,
    UserModule,
  ],
})
export class AppModule {}
