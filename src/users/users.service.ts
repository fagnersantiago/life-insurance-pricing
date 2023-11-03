import { UserRepository } from './repository/user.respository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private userRository: UserRepository) {}

  async execute({ userId, userName, password }: CreateUserDto) {
    try {
      const userExists = await this.userRository.findById(userId);

      if (!userExists) {
        throw new NotFoundException({
          error: {
            code: '404',
            message: 'User not found',
          },
        });
      }

      const user = await this.userRository.create({
        userId,
        userName,
        password,
      });

      return user;
    } catch (error) {
      console.error(error);
    }
  }
}
