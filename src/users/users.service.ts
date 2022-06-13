import { Injectable } from '@nestjs/common';

import { PrismaService } from '../core';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<User[]> {
    return this.prismaService.user.findMany({
      include: { posts: true },
    });
  }

  getUserById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { id: Number(id) } });
  }

  getUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { email: email } });
  }

  createUser(user: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({ data: user });
  }

  deleteUserByID(id: string): Promise<User> {
    return this.prismaService.user.delete({ where: { id: Number(id) } });
  }

  updateUser(user: Prisma.UserUpdateInput, id: string): Promise<User> {
    return this.prismaService.user.update({
      where: { id: Number(id) },
      data: user,
    });
  }
}
