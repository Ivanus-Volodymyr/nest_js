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
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { CommentsService } from './comments.service';
import { Comment } from '@prisma/client';
import { CommentUpdateDto } from './dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Get all comments' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 'number',
          body: 'string',
          published: 'boolean',
          author: 'User',
          authorId: 'number',
          posts: 'Posts[]',
          postsId: 'number',
        },
        {
          id: 'number',
          body: 'string',
          published: 'boolean',
          author: 'User',
          authorId: 'number',
          posts: 'Posts[]',
          postsId: 'number',
        },
        {
          id: 'number',
          body: 'string',
          published: 'boolean',
          author: 'User',
          authorId: 'number',
          posts: 'Posts[]',
          postsId: 'number',
        },
      ],
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: 'Get comment by id' })
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
        body: 'string',
        published: 'boolean',
        author: 'User',
        authorId: 'number',
        posts: 'Posts[]',
        postsId: 'number',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getCommentById(@Param('id') id: string) {
    return this.commentsService.getCommentById(id);
  }

  @ApiOperation({ summary: 'Create comment' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 'number',
        body: 'string',
        published: 'boolean',
        author: 'User',
        authorId: 'number',
        posts: 'Posts[]',
        postsId: 'number',
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createComment(@Body() comment: Comment) {
    return this.commentsService.createComment(comment);
  }

  @ApiOperation({ summary: 'Update comment by id' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 'number',
        body: 'string',
        published: 'boolean',
        author: 'User',
        authorId: 'number',
        posts: 'Posts[]',
        postsId: 'number',
      },
    },
  })
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
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateCommentById(
    @Body() comment: CommentUpdateDto,
    @Param('id') id: string,
  ) {
    return this.commentsService.updateCommentById(comment, id);
  }

  @ApiOperation({ summary: 'Delete comment by id' })
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
        body: 'string',
        published: 'boolean',
        author: 'User',
        authorId: 'number',
        posts: 'Posts[]',
        postsId: 'number',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteCommentById(@Param('id') id: string) {
    return this.commentsService.deleteCommentById(id);
  }
}
