import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';
import { USERS_COLLECTION_NAME, UserEntity, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserSchema,
        collection: USERS_COLLECTION_NAME,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserMapper],
})
export class UserModule {}
