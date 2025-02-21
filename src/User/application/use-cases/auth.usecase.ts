import { User } from '../../domain/User';
import { UserRepository } from '../../domain/repositories/User.repository';
import { ICacheRepository } from '../../../Shared/domain/Repositories/cache-data.repository';
import { EnumCacheData } from '../../../Shared/domain/enums/cache-data.enum';
export class AuthUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheRepository: ICacheRepository
  ) {}

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.login(email, password)
    this.cacheRepository.set(EnumCacheData.SESSION, user);
    return user;
  }

  async register(name: string, email: string, password: string): Promise<void> {
    const user = new User(name, email, password);
    await this.userRepository.register(user).catch((error) => {
      throw new Error(error.message);
    });
    this.cacheRepository.set(EnumCacheData.SESSION, user);
  }

  async getSession(): Promise<User | null> {
    const user = await this.cacheRepository.get<User>(EnumCacheData.SESSION);
    if(!user) return null;
    return user;
  }

  async logout(): Promise<void> {
    this.cacheRepository.remove(EnumCacheData.SESSION);
  }

}
