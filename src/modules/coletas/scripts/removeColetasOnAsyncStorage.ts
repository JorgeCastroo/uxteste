import AsyncStorage from "@react-native-async-storage/async-storage"
import { Coletas } from "../reducers/coletas/coletas"

export const saveColetasOnAsyncStorage = async (idsColetasReprovadas: number[], coletas: Coletas[]) => {
    const coletasReprovadas = coletas.filter(coleta => idsColetasReprovadas.includes(coleta.id))
    const coletasAsyncStorage = await AsyncStorage.getItem("coletas")
    const coletasAsyncStorageJson = coletasAsyncStorage !== null ? JSON.parse(coletasAsyncStorage) as Coletas[] : []

    
}