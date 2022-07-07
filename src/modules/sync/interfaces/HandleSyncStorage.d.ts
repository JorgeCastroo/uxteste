import { ValueToSync } from "./ValueToSync"

export interface HandleSyncStorage<T> {
    key: string
    items: ValueToSync<T>[] | null
}