import { Injectable } from '@nestjs/common';

import { PrismaService } from '../core';
import { Prisma, Comment } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  getAllComments(): Promise<Comment[]> {
    return this.prismaService.comment.findMany({
      include: { Post: true, author: { include: { posts: true } } },
    });
  }

  getCommentById(id: string): Promise<Comment> {
    return this.prismaService.comment.findUnique({ where: { id: Number(id) } });
  }

  createComment(comment: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prismaService.comment.create({ data: comment });
  }

  updateCommentById(
    comment: Prisma.CommentUpdateInput,
    id: string,
  ): Promise<Comment> {
    return this.prismaService.comment.update({
      where: { id: Number(id) },
      data: comment,
    });
  }

  deleteCommentById(id: string): Promise<Comment> {
    return this.prismaService.comment.delete({ where: { id: Number(id) } });
  }
}
