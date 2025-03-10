import { Inject, Injectable } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { NotificationEntity } from 'src/common/shared/entities/notification.entity';
import { RoomEntity } from 'src/common/shared/entities/room.entity';
import { UserEntity } from 'src/common/shared/entities/user.entity';
import { EBookingStatus } from 'src/common/shared/enum/booking_status.enum';
import { ENotificationType } from 'src/common/shared/enum/notification_type.enum';
import { CustomizeException } from 'src/common/shared/exception/customize.exception';
import { NotificationGateway } from 'src/common/until/notification-gateway';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {

    constructor(
        @Inject('NOTIFICATION_REPOSITORY')
        private readonly notificationRepository: Repository<NotificationEntity>,
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<UserEntity>,
        @Inject('ROOM_REPOSITORY')
        private readonly roomRepository: Repository<RoomEntity>,
        private readonly notificationGateway: NotificationGateway
    ) { }


    async getAll(userId: number) {
        const notification = await this.notificationRepository.find({
            where: { user: { id: userId } },
            relations: ['user', 'notification']
        })
        return classToPlain(notification);
    }

    async sendNotification(
        userId: number,
        roomNumber: number,
        hotelName: string,
        bookingStatus?: EBookingStatus,
        notification_type?: ENotificationType,
        customMessage?: string,
        titleMessage?: string
    ): Promise<string> {
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new CustomizeException('user can not exist', 400);
        }

        console.log(notification_type);

        let message = customMessage;
        let title = titleMessage;
        const notificationType = this.mapBookingStatusToNotificationType(bookingStatus);
        if (!message) {
            switch (notification_type || notificationType) {
                case ENotificationType.BOOKING_CONFIRMATION:
                    title = 'BOOKING_CONFIRMATION'
                    message = `Your booking room ${roomNumber} in ${hotelName} has been confirmed! 🎉`;
                    break;
                case ENotificationType.BOOKING_CANCELLATION:
                    title = 'BOOKING_CANCELLATION'
                    message = `Your booking room ${roomNumber} in ${hotelName} has been cancellation! ❌`;
                    break;
                case ENotificationType.BOOKING_PENDING:
                    title = 'BOOKING_PENDING'
                    message = `Your booking room ${roomNumber} in ${hotelName} has been pending! ⏳`;
                    break;
                case ENotificationType.BOOKING_REQUEST:
                    title = 'BOOKING_REQUEST'
                    message = `Your booking room ${roomNumber} in ${hotelName} has been requested! 📩`;
                    break;
                case ENotificationType.CHECK_IN:
                    title = 'CHECK_IN'
                    message = 'TIME TO CHECK IN! 🏨';
                    break;
                case ENotificationType.CHECK_OUT:
                    title = 'CHECK_OUT'
                    message = 'TIME TO CHECK OUT! 🏁';
                    break;
                case ENotificationType.PAYMENT_SUCCESS:
                    title = 'PAYMENT_SUCCESS'
                    message = `Your payment room ${roomNumber} in ${hotelName} was successful! 💰`;
                    break;
                case ENotificationType.PAYMENT_FAILED:
                    title = 'PAYMENT_FAILED'
                    message = `Your payment room ${roomNumber} in ${hotelName} was failed! ❌`;
                    break;
                case ENotificationType.DISCOUNT:
                    title = `DISCOUNT`
                    message = `Your room ${roomNumber} in ${hotelName} has been discounted now!`
                default:
                    title = 'MESSAGE'
                    message = 'You have a new notification!';
            }
        }

        const notification = this.notificationRepository.create({
            message,
            title,
            is_read: false,
            user,
            notification_type: notification_type,
        });

        await this.notificationRepository.save(notification);

        this.notificationGateway.notifyUser(userId, message, notification_type ?? notificationType);

        return 'Notification sent successfully';
    }

    private mapBookingStatusToNotificationType(status?: EBookingStatus): ENotificationType {
        switch (status) {
            case EBookingStatus.BOOKING_REQUEST:
                return ENotificationType.BOOKING_REQUEST;
            case EBookingStatus.BOOKING_PENDING:
                return ENotificationType.BOOKING_PENDING;
            case EBookingStatus.BOOKING_CONFIRMATION:
                return ENotificationType.BOOKING_CONFIRMATION;
            case EBookingStatus.BOOKING_CANCELLATION:
                return ENotificationType.BOOKING_CANCELLATION;
            default:
                return ENotificationType.BOOKING_REQUEST;
        }
    }

}
