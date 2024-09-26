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
    @MessageBody() data: { roomId: string; peerId: string | null },
    @ConnectedSocket() socket: Socket,
  ) {
    const { roomId, peerId } = data;
    // console.log(111111, { roomId, peerId });

    socket.join(roomId);

    try {
      // this.server.to(roomId).emit('subscribeToPeerId', peerId);
      // await this.server.to(roomId).emitWithAck('subscribeToPeerId', peerId);
      socket.to(roomId).emit('subscribeToPeerId', peerId);
    } catch (error) {
      console.log('subscribeToPeerId ERROR =>', error);
    }
  }
}
