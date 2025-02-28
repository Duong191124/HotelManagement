import { Inject, Injectable } from '@nestjs/common';
import { FollowEntity } from 'src/common/shared/entities/follow.entity';
import { RatingEntity } from 'src/common/shared/entities/rating.entity';
import { Repository } from 'typeorm';
import { PostRatingDTO } from './dto/rating-post.dto';
import { RoomEntity } from 'src/common/shared/entities/room.entity';
import { UserEntity } from 'src/common/shared/entities/user.entity';
import { CustomizeException } from 'src/common/shared/exception/customize.exception';
import { classToPlain } from 'class-transformer';
import { FollowRoomDTO } from './dto/follow-room.dto';

@Injectable()
export class RatingService {
    constructor(
        @Inject('RATING_REPOSITORY')
        private readonly ratingRepository: Repository<RatingEntity>,
        @Inject('FOLLOW_REPOSITORY')
        private readonly followRepository: Repository<FollowEntity>,
        @Inject('ROOM_REPOSITORY')
        private readonly roomRepository: Repository<RoomEntity>,
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async getRatingsByRoomId(roomId: number) {
        const user = await this.ratingRepository.find({
            where: { room: { id: roomId } },
            relations: ['room', 'user'],
        });
        return classToPlain(user);
    }

    async postRating(body: PostRatingDTO) {
        const findRoomId = await this.roomRepository.findOneBy({ id: body.room_id });
        const findUserId = await this.userRepository.findOneBy({ id: body.user_id });
        if (!findRoomId || !findUserId) {
            throw new CustomizeException(`Can not find this roomId ${body.room_id} or this userId ${body.user_id} in database`, 400);
        }
        const newRating = this.ratingRepository.create({ ...body, room: findRoomId, user: findUserId })
        const rating = await this.ratingRepository.save(newRating);
        return classToPlain(rating);
    }

    async getFollowByUserId(userId: number) {
        const follow = await this.followRepository.find({
            where: {
                user: { id: userId }
            },
            relations: ['room', 'user']
        });
        const filterUnFollow = follow.filter(t => t.follow == true);
        return classToPlain(filterUnFollow);
    }

    async followRoom(body: FollowRoomDTO) {
        const findRoomId = await this.roomRepository.findOneBy({ id: body.room_id });
        const findUserId = await this.userRepository.findOneBy({ id: body.user_id });

        if (!findRoomId || !findUserId) {
            throw new CustomizeException(`Can not find this roomId ${body.room_id} or this userId ${body.user_id} in database`, 400);
        }

        let follow;

        const existingRoomFollow = await this.followRepository.findOne({
            where: {
                room: { id: body.room_id },
                user: { id: body.user_id }
            },
            relations: ["room", "user"] // Load quan hệ để lấy ID
        });

        if (existingRoomFollow) {
            existingRoomFollow.follow = !existingRoomFollow.follow;
            follow = await this.followRepository.save(existingRoomFollow);
        } else {
            follow = await this.followRepository.save(
                this.followRepository.create({
                    room: findRoomId,
                    user: findUserId,
                    follow: true
                })
            );
        }

        return {
            id: follow.id,
            room_id: follow.room.id,
            user_id: follow.user.id,
            follow: follow.follow,
            created_at: follow.created_at,
            updated_at: follow.updated_at
        };
    }




}
