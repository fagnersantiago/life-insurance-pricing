import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SingDTO } from './dto/signDto';
import { compare } from 'bcrypt';
import { UserRepository } from '../infra/database/prisma/repositories/user.respository';
import { UserNotFound } from '../errors/user-not-found';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.userService.findByUserName(userName);
    console.log(user);
    if (!user) {
      throw new UserNotFound();
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return null;
    }

    return user;
  }

  async login(user: SingDTO) {
    const payload = {
      sub: user.userId,
      userName: user.userName,
      rule: user.rule,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
