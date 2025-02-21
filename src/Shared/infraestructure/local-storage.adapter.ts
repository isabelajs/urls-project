import { IDynamicObject } from "../domain/interfaces/object.interface";
import { ICacheRepository } from "../domain/Repositories/cache-data.repository";

export class LocalStorageAdapter implements ICacheRepository {
    get(key: string): Promise<IDynamicObject | null> {
        return Promise.resolve(JSON.parse(localStorage.getItem(key) || 'null'));
    }
  
    set<T>(key: string, value: T): Promise<void> {
        localStorage.setItem(key, JSON.stringify(value));
        return Promise.resolve();
    } 
  
    remove(key: string): Promise<void> {
        localStorage.removeItem(key);
        return Promise.resolve();
    }
}