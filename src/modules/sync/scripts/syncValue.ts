import info from "../../../utils/info"

export default async function syncValue<T>(functionToSync: () => Promise<boolean>, value: T, syncedValues: T[]){
    try {
        const response = await functionToSync()
        if(response) syncedValues.push(value)
    } catch (error) {
        info.error('syncValue',error)
    }
}