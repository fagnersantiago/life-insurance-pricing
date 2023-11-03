import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const { userName, password } = createUserDto;

      const createUser = await this.usersService.execute({
        userName,
        password,
      });

      return {
        data: {
          userName,
          createUser,
          role: createUserDto.rule,
        },
      };
    } catch (error) {
      console.error(error.message);
    }
  }
}
