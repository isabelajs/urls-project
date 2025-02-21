import { EnumCacheData } from "../enums/cache-data.enum"
import { IDynamicObject } from "../interfaces/object.interface"


export interface ICacheRepository {
  get(key: EnumCacheData): Promise<IDynamicObject | null>
  set<T>(key: EnumCacheData, value: T): Promise<void>
  remove(key: EnumCacheData): Promise<void>
}
