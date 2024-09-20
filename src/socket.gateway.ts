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
export class SocketGateway {
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

  @SubscribeMessage('join')
  joinTheRoom(@MessageBody() room: string, @ConnectedSocket() socket: Socket) {
    socket.join(room);
    this.server.to('room id').emitWithAck('SubscribeMessage', 'peer id');
  }
}
