import { User } from '../User';

export abstract class UserRepository {
  abstract login(email: string, password: string): Promise<User | null>;
  abstract register(user: User): Promise<void>;
  abstract getUserByEmail(email: string): Promise<User | null>;
}