import { HttpException, HttpStatus } from '@nestjs/common';

export class UserIsNotAdmin extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized! Only admin can change users role',
        },
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
