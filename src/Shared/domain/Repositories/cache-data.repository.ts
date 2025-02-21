import { IDynamicObject } from "../interfaces/object.interface"


export interface ICacheRepository {
  get(key: string): Promise<IDynamicObject | null>
  set<T>(key: string, value: T): Promise<void>
  remove(key: string): Promise<void>
}
