export default function createSyncOptions<T>(storageKey: string, storageItems: T){
    return {
        key: storageKey,
        items: storageItems
    }
}