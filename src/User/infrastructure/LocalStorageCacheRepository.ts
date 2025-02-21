import { ICacheRepository } from '../domain/CacheRepository';

export class LocalStorageCacheRepository implements ICacheRepository {
  get(key: string): Promise<any> {
    return Promise.resolve(JSON.parse(localStorage.getItem(key) || 'null'));
  }

  set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
    return Promise.resolve();
  } 

  remove(key: string): Promise<void> {
    localStorage.removeItem(key);
    return Promise.resolve();
  }

}