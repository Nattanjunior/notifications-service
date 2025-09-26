import { NotificationProps } from '@app/entities/notifications';
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
    origin: "*",
    methods: ["GET", "POST"]
  },
  namespace: '/events'
})
export class NotificationsGateway {

  @WebSocketServer()
  server: Server

  handleConnection(client: Socket) {
    console.log(`cliente conectado ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: NotificationProps, @ConnectedSocket() client: Socket) {
    console.log(`Mensagem recebida:`, data);

    this.server.emit('newNotification', {
      message: data,
      date: new Date(),
    });
  }

  sendNotification(notification: any) {
    this.server.emit('newNotification', notification);
  }
} 