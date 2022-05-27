import { ValueToSync } from "../interfaces/ValueToSync"

export default function createValueToSync<T>(value: T): ValueToSync<typeof value>{
    return { sync: false, value }
}