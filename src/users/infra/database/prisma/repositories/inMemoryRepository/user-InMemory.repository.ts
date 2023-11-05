import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from '../../../../../../../src/users/entitie/user';
import { UserRepository } from 'src/users/infra/database/prisma/repositories/prismaRepository/user.respository';

export class InMemoryUserRepository implements UserRepository {
  private userRepository: User[] = [];

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
    const user = new User({
      userName: data.userName,
      password: data.password,
    });

    this.userRepository.push(user);

    return user;
  }

  async findByUserName(userName: string): Promise<User | null> {
    const user = this.userRepository.find((find) => find.userName === userName);
    return user as User;
  }
}
