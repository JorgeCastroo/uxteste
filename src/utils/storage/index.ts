import AsyncStorage from "@react-native-async-storage/async-storage"
import info from "../info"

async function getItem<T>(key: string){
    try {
        const local = await AsyncStorage.getItem(key)
        if(!!local) return JSON.parse(local) as T
        else throw new Error(`No data found with key: ${key}`)
    } catch (error) {
        info.error('getItem', error)
        return null
    }
}

async function setItem(key: string, value: any){
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        info.error('setItem', error)
    }
}

async function removeItem(key: string){
    try {
        await AsyncStorage.removeItem(key)
    } catch (error) {
        info.error('removeItem', error)
    }
}

const storage = {
    getItem, setItem, removeItem
}

export default storage