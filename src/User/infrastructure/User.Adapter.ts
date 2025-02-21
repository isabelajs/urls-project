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

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if(!user) throw new Error('User not found');
    if(user.password !== password) throw new Error('Invalid credentials');
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const users = await this.cacheRepository.get(EnumCacheData.USERS);
    if (!users) return null;
    const usersArray = Array.isArray(users) ? users : [users];
    const user = usersArray.find((user: StoredUser) => user.email === email);
    if (!user) return null;
    return new User(user.name, user.email, user.password);
  }

  async register(user: User): Promise<void> {
    const isUserExists = await this.getUserByEmail(user.email);

    if(isUserExists) {
      throw new Error('User already exists');
    }

    const users = await this.cacheRepository.get<StoredUser[]>(EnumCacheData.USERS) || [];
    users.push(user);

    await this.cacheRepository.set<StoredUser[]>(EnumCacheData.USERS, users);

  }
}