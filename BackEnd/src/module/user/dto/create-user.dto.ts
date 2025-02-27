import { EUser } from "src/common/shared/enum/user.enum";
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    status: EUser.ACTIVE;
}
