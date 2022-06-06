import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll(): CreateUserDto[] {
    return this.userService.getAll();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): CreateUserDto {
    return this.userService.getUserById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() user: CreateUserDto): CreateUserDto {
    return this.userService.createUser(user);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  deleteUser(@Param('id') id: string): string {
    this.userService.deleteUserByID(id);
    return `user with id ${id} was deleted`;
  }

  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  updateUserById(
    @Body() user: Partial<CreateUserDto>,
    @Param('id') id: string,
  ): CreateUserDto {
    return this.userService.updateUser(user, id);
  }
}
