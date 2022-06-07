import { Injectable } from '@nestjs/common';
import { Posts, Prisma } from '@prisma/client';

import { PrismaService } from '../core';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  getAllPosts(): Promise<Posts[]> {
    return this.prismaService.posts.findMany();
  }

  getPostById(id: string): Promise<Posts> {
    return this.prismaService.posts.findUnique({ where: { id: Number(id) } });
  }

  createPost(post: Prisma.PostsCreateInput): Promise<Posts> {
    return this.prismaService.posts.create({ data: post });
  }

  updatePostById(post: Prisma.PostsUpdateInput, id: string): Promise<Posts> {
    return this.prismaService.posts.update({
      where: { id: Number(id) },
      data: post,
    });
  }

  deletePostById(id: string): Promise<Posts> {
    return this.prismaService.posts.delete({ where: { id: Number(id) } });
  }
}
