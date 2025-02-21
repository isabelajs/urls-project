import { User } from '../User';

export abstract class UserRepository {
  abstract checkUserbyEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
  abstract logout(): Promise<void>;
}