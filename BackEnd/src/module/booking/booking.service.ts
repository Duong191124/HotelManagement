import { Inject, Injectable, Logger } from '@nestjs/common';
import { BookingEntity } from 'src/common/shared/entities/booking.entity';
import { LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { CreatedBookingDTO } from './dto/create-booking.dto';
import { UserEntity } from 'src/common/shared/entities/user.entity';
import { RoomEntity } from 'src/common/shared/entities/room.entity';
import { CustomizeException } from 'src/common/shared/exception/customize.exception';
import { EBookingStatus } from 'src/common/shared/enum/booking_status.enum';
import * as moment from 'moment';
import { ERoomStatus } from 'src/common/shared/enum/room_status.enum';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ENotificationType } from 'src/common/shared/enum/notification_type.enum';

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
        const { user_id, room_id, check_in_date, check_out_date } = body;

        // Kiểm tra người dùng có tồn tại không
        const user = await this.userRepository.findOne({ where: { id: user_id } });
        if (!user) {
            throw new CustomizeException(`User with ID ${user_id} not found`, 400);
        }

        // Kiểm tra phòng có tồn tại không
        const room = await this.roomRepository.findOne({
            where: { id: room_id },
            relations: ['hotel_location', 'hotel_location.hotel']
        });
        if (!room) {
            throw new CustomizeException(`Room with ID ${room_id} not found`, 400);
        }

        // Kiểm tra ngày hợp lệ
        const checkIn = moment(check_in_date, 'DD-MM-YYYY HH:mm:ss', true);
        const checkOut = moment(check_out_date, 'DD-MM-YYYY HH:mm:ss', true);

        if (!checkIn.isValid() || !checkOut.isValid()) {
            throw new CustomizeException('Invalid date format. Expected DD-MM-YYYY HH:mm:ss', 400);
        }

        if (checkIn.isAfter(checkOut)) {
            throw new CustomizeException('Check-in date must be before check-out date', 400);
        }

        // Kiểm tra xem phòng đã bị đặt trước đó chưa
        const conflictingBooking = await this.bookingRepository.findOne({
            where: {
                room: { id: room_id },
                check_in_date: LessThanOrEqual(check_out_date),
                check_out_date: MoreThanOrEqual(check_in_date),
            }
        });

        if (conflictingBooking) {
            throw new CustomizeException('This room is already booked for the selected dates', 400);
        }

        // Tính tổng giá tiền
        if (!room.price_per_night) {
            throw new CustomizeException('Room price is not available', 400);
        }

        const nights = checkOut.diff(checkIn, 'days');
        const total_price = nights * room.price_per_night;

        // Lưu thông tin đặt phòng
        const newBooking = this.bookingRepository.create({
            check_in_date: checkIn.format('YYYY-MM-DD HH:mm:ss'),
            check_out_date: checkOut.format('YYYY-MM-DD HH:mm:ss'),
            user,
            room,
            total_price
        });

        await this.bookingRepository.save(newBooking);

        // Gửi thông báo đến người dùng
        return await this.notificationService.sendNotification(
            user_id,
            room.room_number,
            room.hotel_location.hotel.name,
            total_price
        );
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
        const currentDate = moment().utc().format("YYYY-DD-MM HH:mm:ss");

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

    @Cron(CronExpression.EVERY_SECOND)
    async checkInAndOut() {
        const today = moment().add(7, 'hours').utc().format("YYYY-DD-MM HH:mm:ss");

        const bookings = await this.bookingRepository.find({
            where: [
                { check_in_date: today },
                { check_out_date: today },
            ],
            relations: ['user', 'room', 'room.hotel_location', 'room.hotel_location.hotel'],
        });

        for (const booking of bookings) {
            const { user, check_in_date, check_out_date } = booking;
            console.log(booking);
            if (!user) continue;

            if (moment(check_in_date).isSame(today)) {
                await this.notificationService.sendNotification(
                    user.id,
                    booking.room.room_number,
                    booking.room.hotel_location.hotel.name,
                    undefined,
                    ENotificationType.CHECK_IN
                );
            }

            if (moment(check_out_date).isSame(today)) {
                await this.notificationService.sendNotification(
                    user.id,
                    booking.room.room_number,
                    booking.room.hotel_location.hotel.name,
                    undefined,
                    ENotificationType.CHECK_OUT
                );
            }
        }
    }

}
