import getSyncStorage from "./getSyncStorage"

export default async function handleSyncStorage<T>(key: string){
    const items = await getSyncStorage<T>(key)
    
    return { key, items }
}