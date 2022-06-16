import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [SocketService, SocketGateway],
  imports: [AuthModule],
})
export class SocketModule {}
