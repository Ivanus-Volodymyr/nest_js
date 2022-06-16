import { forwardRef, Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../core';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { FileModule } from '../file/file.module';
import { FileService } from '../file/file.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtService, FileService],
  exports: [UsersService],
  imports: [forwardRef(() => AuthModule), FileModule],
})
export class UsersModule {}
