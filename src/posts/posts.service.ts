import { Injectable } from '@nestjs/common';

import { CreatePostsDto } from './dto/create-posts-dto';

@Injectable()
export class PostsService {
  private posts = [];

  getAllPosts(): CreatePostsDto[] {
    return this.posts;
  }

  getPostById(id: string): CreatePostsDto {
    return this.posts.find((value) => value.id == id);
  }

  createPost(post: CreatePostsDto): CreatePostsDto {
    const createdPost = { ...post, id: new Date().valueOf() };
    this.posts.push(createdPost);
    return createdPost;
  }

  updatePostById(post: Partial<CreatePostsDto>, id: string): CreatePostsDto {
    const find = this.posts.find((value) => value.id == id);
    return Object.assign(find, post);
  }

  deletePostById(id: string): void {
    const index = this.posts.findIndex((value) => value.id == id);
    this.posts.splice(index, 1);
  }
}
