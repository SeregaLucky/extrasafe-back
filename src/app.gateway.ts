import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  @WebSocketServer()
  server: Server;

  /* Connection */
  handleConnection(client: Socket) {
    console.log(`Client connect: ${client.id}`);
  }

  /* Disconnect */
  handleDisconnect(client: Socket) {
    console.log(`Client disconnect: ${client.id}`);
  }

  /* Listening message */
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Connected from ${client.id}: ${data}`);

    /* Send all clients message */
    client.broadcast.emit('message', data);
  }
}
