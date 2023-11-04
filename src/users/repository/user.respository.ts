import { User } from '../entitie/user';

export abstract class UserRepository {
  abstract create(data: User): Promise<User | null>;
  abstract findByUserName(userName: string): Promise<User | null>;
  abstract isValidPassword(password: string): Promise<boolean>;
}
