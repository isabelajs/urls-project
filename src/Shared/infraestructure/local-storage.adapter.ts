import { EnumCacheData } from "../domain/enums/cache-data.enum";
import { ICacheRepository } from "../domain/Repositories/cache-data.repository";

export class LocalStorageAdapter implements ICacheRepository {

    get<T>(key: EnumCacheData): Promise<T | null> {
        return Promise.resolve(JSON.parse(localStorage.getItem(key) || 'null'));
    }

    set<T>(key: EnumCacheData, value: T): Promise<void> {
        localStorage.setItem(key, JSON.stringify(value));
        return Promise.resolve();
    }

    remove(key: EnumCacheData): Promise<void> {
        localStorage.removeItem(key);
        return Promise.resolve();
    }
}