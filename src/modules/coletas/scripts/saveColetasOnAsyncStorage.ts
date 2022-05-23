import AsyncStorage from "@react-native-async-storage/async-storage"
import { Coletas } from "../reducers/coletas/coletas"

export const saveColetasOnAsyncStorage = async (coletas: Coletas[]) => {
    const coletasAsyncStorage = await AsyncStorage.getItem("coletas")
    const coletasAsyncStorageJson = coletasAsyncStorage !== null ? JSON.parse(coletasAsyncStorage) as Coletas[] : []

    for (const coleta of coletas) {
        const coletaInclusa = coletasAsyncStorageJson.find(() => coleta.id)
        if (!coletaInclusa) coletasAsyncStorageJson.push(coleta)
    }

    await AsyncStorage.setItem("coletas", JSON.stringify(coletasAsyncStorageJson))
}