import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ENotificationType } from '../shared/enum/notification_type.enum';

@WebSocketGateway({ cors: true })
export class NotificationGateway {
    @WebSocketServer()
    server: Server;

    notifyUser(userId: number, message: string, notificationType: ENotificationType) {
        this.server.emit(`notification-${userId}`, { message, notificationType });
    }
}