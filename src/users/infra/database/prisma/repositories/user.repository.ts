import { UserRepository } from 'src/users/infra/database/prisma/repositories/prismaRepository/user.respository';
import { PrismaService } from '../prisma.service';
import { User } from 'src/users/entitie/user';
import { Injectable } from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async isValidPassword(password: string): Promise<boolean> {
    const hasQuantityCaracterAllowed = password.length;
    if (hasQuantityCaracterAllowed < 8 && hasQuantityCaracterAllowed > 64) {
      return false;
    }

    const isSecurePassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#!$%])[A-Za-z\d@#!$%]*$/;

    if (!isSecurePassword.test(password)) return false;

    return true;
  }

  async create(data: CreateUserDto): Promise<User | null> {
    const userCreated = await this.prisma.user.create({
      data: {
        userName: data.userName,
        password: data.password,
      },
    });

    return userCreated;
  }

  async findByUserName(userName: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        userName,
      },
    });

    if (!user) {
      return null;
    }
    return user;
  }
}
