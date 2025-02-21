import { EUser } from "src/common/shared/enum/user.enum";

export class CreateUserDto {
    name: string;
    username: string;
    password: string;
    email: string;
    status: EUser.ACTIVE;
}
