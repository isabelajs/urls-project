import { IUrls } from '../interfaces/urls.interface';
import { User } from '../User';

export abstract class UserRepository {
  abstract login(email: string, password: string): Promise<User | null>;
  abstract register(user: User): Promise<void>;
  abstract getUserByEmail(email: string): Promise<User | null>;
  abstract saveUrlsByEmail(email: string, url: IUrls): Promise<void>;
  abstract getUrlsByEmail(email: string): Promise<IUrls[]>;
  abstract removeUrl(email: string, nameUrl: string): Promise<void>;
}