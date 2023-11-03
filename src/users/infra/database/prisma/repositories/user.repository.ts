import { PrismaService } from '../prisma.service';
import { UserRepository } from 'src/users/repository/user.respository';
import { User } from 'src/users/entitie/user';

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async isValidPassword(password: string): Promise<boolean> {
    const hasQuantityCaracterAllowed = password.length;
    if (hasQuantityCaracterAllowed >= 8 && hasQuantityCaracterAllowed <= 64) {
      return true;
    }

    const isSecurePassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#!$%])[A-Za-z\d@#!$%]*$/;

    if (!isSecurePassword.test(password)) return false;

    return true;
  }

  async create(data: User): Promise<User | null> {
    const userCreated = await this.prisma.user.create({
      data: {
        userName: data.userName,
        password: data.password,
      },
    });

    return userCreated;
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      return null;
    }
    return user;
  }
}
