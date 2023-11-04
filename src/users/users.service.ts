import { UserRepository } from './repository/user.respository';
import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private userRository: UserRepository) {}

  async execute({ userId, userName, password }: CreateUserDto) {
    try {
      const userExists = await this.userRository.findByUserName(userName);

      if (userExists) {
        throw new ConflictException({
          error: {
            code: '409',
            message: 'User With userName Alredy Exists',
          },
        });
      }

      const isValidPassword = await this.userRository.isValidPassword(password);

      if (!isValidPassword) {
        throw new Error('Invalid passord');
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
