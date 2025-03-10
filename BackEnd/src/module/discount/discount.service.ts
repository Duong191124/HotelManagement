import { Inject, Injectable } from '@nestjs/common';
import { DiscountEntity } from 'src/common/shared/entities/discount.entity';
import { RatingEntity } from 'src/common/shared/entities/rating.entity';
import { In, Repository } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { UserEntity } from 'src/common/shared/entities/user.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateDiscountDTO } from './dto/create-discount.dto';
import { RoomEntity } from 'src/common/shared/entities/room.entity';
import { CustomizeException } from 'src/common/shared/exception/customize.exception';
import { RoomService } from '../room/room.service';
import { ENotificationType } from 'src/common/shared/enum/notification_type.enum';

@Injectable()
export class DiscountService {
    constructor(
        @Inject('RATING_REPOSITORY')
        private readonly ratingRepository: Repository<RatingEntity>,
        @Inject('DISCOUNT_REPOSITORY')
        private readonly discountRepository: Repository<DiscountEntity>,
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<UserEntity>,
        private readonly roomService: RoomService,
        private readonly notificationService: NotificationService,
    ) { }

    async createDiscount(body: CreateDiscountDTO) {
        const newDiscount = this.discountRepository.create(body);
        return await this.discountRepository.save(newDiscount);
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async checkMessageDiscountFollow() {
        const discountedRooms = await this.roomService.findDiscount();
        if (!discountedRooms.length) return;

        const findRoomId = discountedRooms.map(t => t.id);
        const followedRooms = await this.userRepository.find({
            where: { room: { id: In(findRoomId) } },
            relations: ['room', 'user']
        });

        for (const follow of followedRooms) {
            await this.notificationService.sendNotification(
                follow.id,
                follow.room.room_number,
                follow.room.hotel_location.hotel.name,
                undefined,
                ENotificationType.DISCOUNT
            );
        }
    }
}
