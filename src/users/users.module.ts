import { forwardRef, Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../core';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtService],
  exports: [UsersService],
  imports: [forwardRef(() => AuthModule)],
})
export class UsersModule {}
