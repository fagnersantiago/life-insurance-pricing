import { User } from '../entitie/user';

export abstract class UserRepository {
  abstract create(data: User): Promise<User | null>;
  abstract findById(userId: string): Promise<User | null>;
  abstract isValidPassword(password: string): Promise<boolean>;
}
