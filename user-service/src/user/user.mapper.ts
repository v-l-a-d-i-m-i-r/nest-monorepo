import { Injectable } from '@nestjs/common';

import { UserModel } from './user.model';
import { UserEntity } from './user.schema';

@Injectable()
export class UserMapper {
  public mapEntityToModel(entity: UserEntity): UserModel {
    return {
      id: entity._id.toHexString(),
      name: entity.name,
      email: entity.email,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  public mapEntityToModelIfExists(entity: UserEntity | null): UserModel | null {
    if (!entity) {
      return null;
    }

    return this.mapEntityToModel(entity);
  }
}
