import AsyncStorage from "@react-native-async-storage/async-storage"
import { Coletas } from "../reducers/coletas/coletas"

export const saveColetasOnAsyncStorage = async (idsColetasAprovadas: number[], coletas: Coletas[]) => {
    const coletasAprovadas = coletas.filter(coleta => idsColetasAprovadas.includes(coleta.id))
    const coletasAsyncStorage = await AsyncStorage.getItem("coletas")
    const coletasAsyncStorageJson = coletasAsyncStorage !== null ? JSON.parse(coletasAsyncStorage) as Coletas[] : []

    for (const coleta of coletasAprovadas) {
        const coletaInclusa = coletasAsyncStorageJson.find(item => item.id)
        if (!coletaInclusa) coletasAsyncStorageJson.push(coleta)
    }

    await AsyncStorage.setItem("coletas", JSON.stringify(coletasAsyncStorageJson))
}