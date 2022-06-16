import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { AuthService } from '../auth/auth.service';

@WebSocketGateway({
  pingTimeOut: 6000,
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;
  constructor(private authService: AuthService) {}

  @SubscribeMessage('join')
  async join(client: Socket, data: { access_token: string }) {
    const userId = await this.authService.verifyUser(data.access_token);
    console.log(userId);
  }
}
