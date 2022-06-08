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

import { CommentsService } from './comments.service';
import { Comment } from '@prisma/client';
import { CommentUpdateDto } from './dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllComments() {
    return this.commentsService.getAllComments();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getCommentById(@Param('id') id: string) {
    return this.commentsService.getCommentById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createComment(@Body() comment: Comment) {
    return this.commentsService.createComment(comment);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateCommentById(
    @Body() comment: CommentUpdateDto,
    @Param('id') id: string,
  ) {
    return this.commentsService.updateCommentById(comment, id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteCommentById(@Param('id') id: string) {
    return this.commentsService.deleteCommentById(id);
  }
}
