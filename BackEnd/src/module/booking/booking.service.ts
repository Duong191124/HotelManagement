import { Inject, Injectable, Logger } from '@nestjs/common';
import { BookingEntity } from 'src/common/shared/entities/booking.entity';
import { LessThan, Repository } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { CreatedBookingDTO } from './dto/create-booking.dto';
import { UserEntity } from 'src/common/shared/entities/user.entity';
import { RoomEntity } from 'src/common/shared/entities/room.entity';
import { CustomizeException } from 'src/common/shared/exception/customize.exception';
import { EBookingStatus } from 'src/common/shared/enum/booking_status.enum';
import * as moment from 'moment';
import { ERoomStatus } from 'src/common/shared/enum/room_status.enum';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BookingService {
    private readonly logger = new Logger(BookingService.name);

    constructor(
        @Inject('BOOKING_REPOSITORY')
        private readonly bookingRepository: Repository<BookingEntity>,
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<UserEntity>,
        @Inject('ROOM_REPOSITORY')
        private readonly roomRepository: Repository<RoomEntity>,
        private readonly notificationService: NotificationService,
    ) { }

    async bookingRoom(body: CreatedBookingDTO) {
        const findUserId = await this.userRepository.findOne({ where: { id: body.user_id } });
        const findRoomId = await this.roomRepository.findOne({ where: { id: body.room_id } });
        if (!findUserId || !findRoomId) {
            throw new CustomizeException(`Can not find this roomId ${findRoomId} or this userId ${findUserId}`, 400);
        }
        const booking = await this.bookingRepository.find({
            where: {
                room: { id: body.room_id },
            },
            relations: ['room', 'room.hotel_location', 'room.hotel_location.hotel']
        });
        if (booking.some(t => t.room.room_status === ERoomStatus.NOT_AVAILABLE)) {
            throw new CustomizeException('This room is reserved', 400);
        }
        const newBooking = this.bookingRepository.create({
            ...body,
            user: findUserId,
            room: findRoomId
        })
        await this.bookingRepository.save(newBooking);
        const roomNumber = booking.map(t => t.room.room_number);
        const hotelName = booking.map(t => t.room.hotel_location.hotel.name);
        return await this.notificationService.sendNotification(body.user_id, roomNumber[0], hotelName[0], 0);
    }

    async updateBookingRoom(bookingId: number) {
        const booking = await this.bookingRepository.findOne({
            where: { id: bookingId },
            relations: ['user', 'room', 'room.hotel_location', 'room.hotel_location.hotel'],
        });

        if (!booking) {
            throw new CustomizeException('Booking not found', 400);
        }

        if (booking.status === 1 && booking.room) {
            booking.room.room_status = 1;
            await this.roomRepository.save(booking.room);
        }

        const nextStatus = this.getNextStatus(booking.status);
        await this.bookingRepository.update(booking.id, { status: nextStatus });

        await this.notificationService.sendNotification(
            booking.user.id,
            booking.room.room_number,
            booking.room.hotel_location.hotel.name,
            nextStatus
        );
    }

    private getNextStatus(currentStatus: EBookingStatus): EBookingStatus {
        switch (currentStatus) {
            case EBookingStatus.BOOKING_REQUEST:
                return EBookingStatus.BOOKING_PENDING;
            case EBookingStatus.BOOKING_PENDING:
                return EBookingStatus.BOOKING_CONFIRMATION;
            default:
                return currentStatus; // Nếu đã xác nhận thì không thay đổi
        }
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async autoUpdateRoomStatus() {
        const currentDate = new Date();

        const expiredBookings = await this.bookingRepository.find({
            where: {
                is_expired: false,
                check_out_date: LessThan(currentDate)
            },
            relations: ['room'],
        });

        if (expiredBookings.length === 0) {
            return;
        }

        for (const booking of expiredBookings) {
            if (booking.room.room_status !== ERoomStatus.AVAILABLE) {
                booking.room.room_status = ERoomStatus.AVAILABLE;
                booking.is_expired = true;
                await this.roomRepository.save(booking.room);
                await this.bookingRepository.save(booking);
            }
        }
    }

}
