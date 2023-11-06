import { Controller, Patch, Body, Param } from '@nestjs/common';
import { ChangeRoleUsersService } from './update.role.users.service';

import { ChangeRoleUsersDto } from '../dto/change-role.users.dto';

@Controller('users')
export class ChangeRoleUsersController {
  constructor(private updateRoleUserService: ChangeRoleUsersService) {}

  @Patch('/:userId')
  async handle(
    @Param('userId') userId: string,
    @Body()
    body: ChangeRoleUsersDto,
  ) {
    const { rule } = body;

    const createUser = await this.updateRoleUserService.execute({
      userId,
      rule,
    });

    return {
      data: {
        userId: createUser.userId,
        userName: createUser.userName,
        rule: createUser.rule,
      },
    };
  }
}
