import { Injectable, NotFoundException } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import { UserModel } from './user.model';
import { UserRepository } from './user.repository';
import { Errors } from '../const/errors';
import { UserTopics } from '../const/topics';

@Injectable()
export class UserService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly rmqService: RMQService,
  ) {}

  public async createUser(input: CreateUserInput): Promise<UserModel> {
    const user = await this.userRepository.createUser(input);

    const event = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
    await this.rmqService.notify(UserTopics.UserCreated, event);

    return user;
  }

  public async updateUserById(input: UpdateUserByIdInput): Promise<UserModel> {
    const user = await this.userRepository.updateUseById(input);

    if (!user) {
      throw new NotFoundException(Errors.userNotFound);
    }

    return user;
  }

  public async deleteUserById(input: DeleteUserByIdInput): Promise<void> {
    const user = await this.userRepository.getUserById(input);

    if (!user) {
      return; // to keep EP idempotent
    }

    await this.userRepository.deleteUserById(input);

    const event = {
      id: user.id,
      name: user.name,
      email: user.email,
      deletedAt: new Date().toISOString(),
    };
    await this.rmqService.notify(UserTopics.UserDeleted, event);
  }

  public async getUserById(input: GetUserByIdInput): Promise<UserModel> {
    const user = await this.userRepository.getUserById(input);

    if (!user) {
      throw new NotFoundException(Errors.userNotFound);
    }

    return user;
  }

  public async getUsers(input: GetUsersInput): Promise<GetUsersOutput> {
    const limit = input.limit ?? 10;
    const page = input.page ?? 1;
    const skip = (page - 1) * limit;

    const users = await this.userRepository.getUsers({ skip, limit });

    return {
      users,
      meta: {
        page,
        limit,
      },
    };
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
  page?: number;
  limit?: number;
};

type GetUsersOutput = {
  users: UserModel[];
  meta: {
    page: number;
    limit: number;
  };
};
