import { ValueToSync } from "../interfaces/ValueToSync"

export default function c<T>(value: T): ValueToSync<T>{
    return { sync: false, value, dtSync: '' }
}