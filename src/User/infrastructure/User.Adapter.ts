import { EnumCacheData } from '../../Shared/domain/enums/cache-data.enum';
import { ICacheRepository } from '../../Shared/domain/Repositories/cache-data.repository';
import { UserRepository } from '../domain/repositories/User.repository';
import { User } from '../domain/User';

interface StoredUser {
    name: string;
    email: string;
    password: string;
}

export class UserAdapter implements UserRepository {
  constructor(private readonly cacheRepository: ICacheRepository) {}

  async checkUserbyEmail(email: string): Promise<User | null> {
    const users = await this.cacheRepository.get(EnumCacheData.USER);
    if (!users) return null;
    const usersArray = Array.isArray(users) ? users : [users];
    const user = usersArray.find((user: StoredUser) => user.email === email);
    if (!user) return null;
    console.log('user', user);
    return new User(user.name, user.email, user.password);
  }

  async save(user: User): Promise<void> {
    const isUserExists = await this.checkUserbyEmail(user.email);
    if(isUserExists) {
      throw new Error('User already exists');
    }
  
    await this.cacheRepository.set<User>(EnumCacheData.USER, user);
  }

  async logout(): Promise<void> {
    await this.cacheRepository.remove(EnumCacheData.USER);
  }
}