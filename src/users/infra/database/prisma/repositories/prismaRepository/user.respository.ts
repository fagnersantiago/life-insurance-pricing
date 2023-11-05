import { CreateUserDto } from '../../../../../dto/create-user.dto';
import { User } from '../../../../../entitie/user';

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<User | null>;
  abstract findByUserName(userName: string): Promise<User | null>;
  abstract isValidPassword(password: string): Promise<boolean>;
}
