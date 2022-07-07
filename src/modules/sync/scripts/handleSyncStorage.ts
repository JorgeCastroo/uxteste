import { HandleSyncStorage } from "../interfaces/HandleSyncStorage"
import getSyncStorage from "./getSyncStorage"

export default async function handleSyncStorage<T>(key: string): Promise<HandleSyncStorage<T>> {
    const items = await getSyncStorage<T>(key)
    
    return { key, items }
}