import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { UserMapper } from './user.mapper';
import { UserModel } from './user.model';
import { UserDocument, UserEntity } from './user.schema';

@Injectable()
export class UserRepository {
  public constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
    private readonly userMapper: UserMapper,
  ) {}

  public async createUser(input: CreateUserInput): Promise<UserModel> {
    const user = await this.userModel.create(input);

    return this.userMapper.mapEntityToModel(user);
  }

  public async updateUseById(input: UpdateUserByIdInput): Promise<UserModel | null> {
    const { id, ...dataToUpdate } = input;

    const filter = {
      _id: new Types.ObjectId(id),
    };

    const update = {
      $set: dataToUpdate,
    };

    const options = {
      new: true,
    };

    const updatedUser = await this.userModel.findOneAndUpdate(filter, update, options);

    return this.userMapper.mapEntityToModelIfExists(updatedUser);
  }

  public async deleteUserById(input: DeleteUserByIdInput): Promise<void> {
    const filter = {
      _id: new Types.ObjectId(input.id),
    };

    await this.userModel.findOneAndDelete(filter);
  }

  public async getUserById(input: GetUserByIdInput): Promise<UserModel | null> {
    const filter = {
      _id: new Types.ObjectId(input.id),
    };

    const user = await this.userModel.findOne(filter);

    return this.userMapper.mapEntityToModelIfExists(user);
  }

  public async getUsers(input: GetUsersInput): Promise<UserModel[]> {
    const filter = {};
    const projection = {};
    const options = { skip: input.skip, limit: input.limit };

    const users = await this.userModel.find(filter, projection, options).read('secondaryPreferred');

    return users.map((user) => this.userMapper.mapEntityToModel(user));
  }
}

type CreateUserInput = {
  name: string;
  email: string;
};

type UpdateUserByIdInput = {
  id: string;
  name?: string;
  email?: string;
};

type DeleteUserByIdInput = {
  id: string;
};

type GetUserByIdInput = {
  id: string;
};

type GetUsersInput = {
  skip?: number;
  limit?: number;
};
