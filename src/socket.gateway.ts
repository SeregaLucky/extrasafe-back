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
  async joinTheRoom(
    @MessageBody() peerId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const roomId = 'room-id-1';
    socket.join(roomId);

    try {
      await this.server.to(roomId).emitWithAck('subscribeToPeerId', peerId);
    } catch (error) {
      console.log('SubscribeMessage ERROR =>', error);
    }
  }
}
