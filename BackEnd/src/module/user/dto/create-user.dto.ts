import { EUser } from "src/common/shared/enum/user.enum";
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    re_password: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @ApiProperty()
    status: EUser.ACTIVE;
}
