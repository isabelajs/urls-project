import { EnumCacheData } from "../enums/cache-data.enum"


export interface ICacheRepository {
  get<T>(key: EnumCacheData): Promise<T | null>
  set<T>(key: EnumCacheData, value: T): Promise<void>
  remove(key: EnumCacheData): Promise<void>
}
