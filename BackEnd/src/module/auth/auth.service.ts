import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthLogin } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { comparingPassword } from 'src/common/until/bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { };

  async signIn(body: AuthLogin): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(body.username);

    if (comparingPassword(body.password, user?.password ?? "")) {
      const payload = { sub: user?.id ?? "", username: user?.username ?? "" };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
