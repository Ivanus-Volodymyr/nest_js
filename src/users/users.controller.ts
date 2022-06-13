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
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/guards/jwt-auth-guard';
import { RequestExtended } from '../auth/request/request-extended';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 'number',
          email: 'string',
          name: 'string',
          age: 'integer',
          city: 'string',
          password: 'string',
          status: 'boolean',
          posts: 'Posts[]',
          comments: 'Comment[]',
        },
        {
          id: 'number',
          email: 'string',
          name: 'string',
          age: 'integer',
          city: 'string',
          password: 'string',
          status: 'boolean',
          posts: 'Posts[]',
          comments: 'Comment[]',
        },
        {
          id: 'number',
          email: 'string',
          name: 'string',
          age: 'integer',
          city: 'string',
          password: 'string',
          status: 'boolean',
          posts: 'Posts[]',
          comments: 'Comment[]',
        },
      ],
    },
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({
    name: 'id',
    schema: {
      example: {
        id: 'string',
      },
    },
  })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 'number',
        email: 'string',
        name: 'string',
        age: 'integer',
        city: 'string',
        password: 'string',
        status: 'boolean',
        posts: 'Posts[]',
        comments: 'Comment[]',
      },
    },
  })
  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiBody({
    schema: {
      example: {
        id: 'number',
        email: 'string',
        name: 'string',
        age: 'integer',
        city: 'string',
        password: 'string',
        status: 'boolean',
        posts: 'Posts[]',
        comments: 'Comment[]',
      },
    },
  })
  @ApiCreatedResponse({
    status: 201,
    schema: {
      example: {
        id: 'number',
        email: 'string',
        name: 'string',
        age: 'integer',
        city: 'string',
        password: 'string',
        status: 'boolean',
        posts: 'Posts[]',
        comments: 'Comment[]',
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Req() req: RequestExtended, @Body() user: User) {
    return this.userService.createUser(user);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiParam({
    name: 'id',
    schema: {
      example: {
        id: 'string',
      },
    },
  })
  @ApiBody({
    schema: {
      example: {
        name: 'string',
        age: 'number',
        city: 'string',
      },
    },
  })
  @ApiOkResponse({
    status: 204,
    schema: {
      example: {
        id: 'number',
        email: 'string',
        name: 'string',
        age: 'integer',
        city: 'string',
        password: 'string',
        status: 'boolean',
        posts: 'Posts[]',
        comments: 'Comment[]',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  updateUserById(@Body() user: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(user, id);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiParam({
    name: 'id',
    schema: {
      example: {
        id: 'string',
      },
    },
  })
  @ApiOkResponse({
    status: 202,
    schema: {
      example: {
        id: 'number',
        email: 'string',
        name: 'string',
        age: 'integer',
        city: 'string',
        password: 'string',
        status: 'boolean',
        posts: 'Posts[]',
        comments: 'Comment[]',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUserByID(id);
  }
}
