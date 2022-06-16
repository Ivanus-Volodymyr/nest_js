import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    CommentsModule,
    AuthModule,
    FileModule,
    SocketModule,
  ],
})
export class AppModule {}
