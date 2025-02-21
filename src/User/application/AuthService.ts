import { User } from '../domain/User';
import { IUserRepository } from '../domain/UserRepository';
import { ICacheRepository } from '../domain/CacheRepository';
export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cacheRepository: ICacheRepository
  ) {}

  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !user.verifyPassword(password)) {
      throw new Error('Invalid credentials');
    }

    await this.cacheRepository.set('user', user);

    return user;
  }

  async register(name: string, email: string, password: string): Promise<void> {
    const user = new User(name, email, password);
    await this.userRepository.save(user);
  }
}