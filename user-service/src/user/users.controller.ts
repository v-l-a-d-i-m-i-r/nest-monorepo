import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserBody, CreateUserResponse } from './dto/create-user.dto';
import { DeleteUserParams } from './dto/delete-user.dto';
import { GetUserParams, GetUserResponse } from './dto/get-user.dto';
import { GetUsersQuery, GetUsersResponse } from './dto/get-users.dto';
import { UpdateUserBody, UpdateUserParams, UpdateUserResponse } from './dto/update-user.dto';
import { UserService } from './user.service';
import { LoggerService } from '../logger/logger.service';

@ApiTags('Users')
@Controller('/api/v1/users')
export class UserController {
  public constructor(
    private readonly logger: LoggerService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ description: 'Create User' })
  @ApiResponse({ type: CreateUserResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  public async createUser(@Body() body: CreateUserBody): Promise<CreateUserResponse> {
    try {
      const user = await this.userService.createUser(body);

      return new CreateUserResponse(user);
    } catch (error) {
      this.logger.error('UserController.createUser', error);
      throw error;
    }
  }

  @ApiOperation({ description: 'Update User' })
  @ApiResponse({ type: UpdateUserResponse })
  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  public async updateUser(
    @Param() params: UpdateUserParams,
    @Body() body: UpdateUserBody,
  ): Promise<UpdateUserResponse> {
    try {
      const user = await this.userService.updateUserById({ id: params.id, ...body });

      return new UpdateUserResponse(user);
    } catch (error) {
      this.logger.error('UserController.updateUser', error);
      throw error;
    }
  }

  @ApiOperation({ description: 'Delete User' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  public async deleteUser(@Param() params: DeleteUserParams): Promise<void> {
    try {
      await this.userService.deleteUserById({ id: params.id });
    } catch (error) {
      this.logger.error('UserController.deleteUser', error);
      throw error;
    }
  }

  @ApiOperation({ description: 'Get User' })
  @ApiResponse({ type: GetUserResponse })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  public async getUser(@Param() params: GetUserParams): Promise<GetUserResponse> {
    try {
      const user = await this.userService.getUserById({ id: params.id });

      return new GetUserResponse(user);
    } catch (error) {
      this.logger.error('UserController.getUser', error);
      throw error;
    }
  }

  @ApiOperation({ description: 'Get Users' })
  @ApiResponse({ type: GetUsersResponse })
  @HttpCode(HttpStatus.OK)
  @Get('/')
  public async getUsers(@Query() query: GetUsersQuery): Promise<GetUsersResponse> {
    try {
      const { users, meta } = await this.userService.getUsers(query);

      return new GetUsersResponse(users, meta);
    } catch (error) {
      this.logger.error('UserController.getUsers', error);
      throw error;
    }
  }
}
