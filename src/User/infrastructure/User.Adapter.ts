import { EnumCacheData } from '../../Shared/domain/enums/cache-data.enum';
import { ICacheRepository } from '../../Shared/domain/Repositories/cache-data.repository';
import { IUrls } from '../domain/interfaces/urls.interface';
import { IStoredUser } from './interfaces/stored-user.interface';
import { UserRepository } from '../domain/repositories/User.repository';
import { User } from '../domain/User';
import { IStoreUrls } from './interfaces/store-urls.interface';

export class UserAdapter implements UserRepository {
  constructor(private readonly cacheRepository: ICacheRepository) {}


  async login(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if(!user) throw new Error('User not found');
    if(!user.verifyPassword(password)) throw new Error('Invalid credentials');
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const users = await this.cacheRepository.get(EnumCacheData.USERS);
    if (!users) return null;
    const usersArray = Array.isArray(users) ? users : [users];
    const user = usersArray.find((user: IStoredUser) => user.email === email);
    if (!user) return null;
    return new User(user.name, user.email, user.password);
  }

  async register(user: User): Promise<void> {
    const isUserExists = await this.getUserByEmail(user.email);
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.encryptPassword(user.password),
    }
    if(isUserExists) {
      throw new Error('User already exists');
    }
    const users = await this.cacheRepository.get<IStoredUser[]>(EnumCacheData.USERS) || [];
    users.push(newUser);
    await this.cacheRepository.set<IStoredUser[]>(EnumCacheData.USERS, users);
  }

  async saveUrlsByEmail(email: string, url: IUrls): Promise<void> {
    const storeUrls = await this.cacheRepository.get<IStoreUrls[]>(EnumCacheData.URLS) || [];
    let user = storeUrls.find((user: IStoreUrls) => user.email === email);
    if (!user) {
      user = { email, urls: [] };
      storeUrls.push(user);
    }
    const hasUrl = user.urls.some((existingUrl: IUrls) => 
      existingUrl.url === url.url || existingUrl.name === url.name
    );
    if (hasUrl) {
      throw new Error('URL or name already exists for this user');
    }
    user.urls.push(url);
    await this.cacheRepository.set<IStoreUrls[]>(EnumCacheData.URLS, storeUrls);
  }

  async getUrlsByEmail(email: string): Promise<IUrls[]> {
    const storeUrls = await this.cacheRepository.get<IStoreUrls[]>(EnumCacheData.URLS);
    if(!storeUrls) throw new Error('Store urls not found');
    const user = storeUrls.find((user: IStoreUrls) => user.email === email);
    if(!user) throw new Error('User not found');
    return user.urls;
  }

  async removeUrl(email: string, nameUrl: string): Promise<void> {
    const storeUrls = await this.cacheRepository.get<IStoreUrls[]>(EnumCacheData.URLS);
    if(!storeUrls) throw new Error('Store urls not found');
    const user = storeUrls.find((user: IStoreUrls) => user.email === email);
    if(!user) throw new Error('User not found');
    user.urls = user.urls.filter((url: IUrls) => url.name !== nameUrl);
    await this.cacheRepository.set<IStoreUrls[]>(EnumCacheData.URLS, storeUrls);
  }

}
