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
import { Posts, Prisma } from '@prisma/client';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 'number',
          title: 'string',
          content: 'string',
          published: 'boolean',
          authorId: 'number',
          author: 'User',
          comments: 'Comment[]',
        },
        {
          id: 'number',
          title: 'string',
          content: 'string',
          published: 'boolean',
          authorId: 'number',
          author: 'User',
          comments: 'Comment[]',
        },
        {
          id: 'number',
          title: 'string',
          content: 'string',
          published: 'boolean',
          authorId: 'number',
          author: 'User',
          comments: 'Comment[]',
        },
      ],
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @ApiOperation({ summary: 'Get post by id' })
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
        title: 'string',
        content: 'string',
        published: 'boolean',
        authorId: 'number',
        author: 'User',
        comments: 'Comment[]',
      },
    },
  })
  @HttpCode(HttpStatus.FOUND)
  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @ApiOperation({ summary: 'Create post' })
  @ApiOkResponse({
    status: 201,
    schema: {
      example: {
        id: 'number',
        title: 'string',
        content: 'string',
        published: 'boolean',
        authorId: 'number',
        author: 'User',
        comments: 'Comment[]',
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createPost(@Body() post: Posts) {
    return this.postsService.createPost(post);
  }

  @ApiOperation({ summary: 'Update post by id' })
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
        body: 'string',
      },
    },
  })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 'number',
        title: 'string',
        content: 'string',
        published: 'boolean',
        authorId: 'number',
        author: 'User',
        comments: 'Comment[]',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updatePostById(
    @Body() post: Prisma.PostsUpdateInput,
    @Param('id') id: string,
  ) {
    return this.postsService.updatePostById(post, id);
  }

  @ApiOperation({ summary: 'Update post by id' })
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
        title: 'string',
        content: 'string',
        published: 'boolean',
        authorId: 'number',
        author: 'User',
        comments: 'Comment[]',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deletePostById(@Param('id') id: string) {
    return this.postsService.deletePostById(id);
  }
}
