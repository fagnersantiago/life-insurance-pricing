import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from 'src/users/infra/database/prisma/repositories/prismaRepository/user.respository';
import { PrismaUserRepository } from './repositories/user.repository';

@Module({
  providers: [
    PrismaService,

    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaService, UserRepository],
})
export class DatabaseModule {}
