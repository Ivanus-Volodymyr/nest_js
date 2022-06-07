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

import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @HttpCode(HttpStatus.FOUND)
  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createPost(@Body() post: Posts) {
    return this.postsService.createPost(post);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updatePostById(
    @Body() post: Prisma.PostsUpdateInput,
    @Param('id') id: string,
  ) {
    return this.postsService.updatePostById(post, id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deletePostById(@Param('id') id: string) {
    return this.postsService.deletePostById(id);
  }
}
