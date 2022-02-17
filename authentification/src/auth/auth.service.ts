import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(username: string, password: string) {
    const user = this.usersService.findOneByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_toke: this.jwtService.sign(payload),
    };
  }
}
