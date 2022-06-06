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

import { CreatePostsDto } from './dto/create-posts-dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllPosts(): CreatePostsDto[] {
    return this.postsService.getAllPosts();
  }

  @HttpCode(HttpStatus.FOUND)
  @Get(':id')
  getPostById(@Param('id') id: string): CreatePostsDto {
    return this.postsService.getPostById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createPost(@Body() post: CreatePostsDto): CreatePostsDto {
    return this.postsService.createPost(post);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updatePostById(
    @Body() post: Partial<CreatePostsDto>,
    @Param('id') id: string,
  ): CreatePostsDto {
    return this.postsService.updatePostById(post, id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deletePostById(@Param('id') id: string): string {
    this.postsService.deletePostById(id);
    return `post by id ${id} was deleted`;
  }
}
