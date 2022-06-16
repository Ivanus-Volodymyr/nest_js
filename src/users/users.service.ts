import { Injectable } from '@nestjs/common';

import { PrismaService } from '../core';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto';
import { FileService } from '../file/file.service';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private fileService: FileService,
  ) {}

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

  async updateUser(
    file: object,
    user: UpdateUserDto,
    id: string,
  ): Promise<User> {
    const data = await this.fileService.uploadFile(file);
    return this.prismaService.user.update({
      where: { id: Number(id) },
      data: { ...user, age: Number(user.age), avatar: data.Location },
    });
  }
}
