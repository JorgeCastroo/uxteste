import { UserData } from "../../../interfaces/UserData"
import updateLista from "./requests/requestUpdateLista"
import updateVolume from "./requests/requestUpdateVolumes"

export default async function checkListaUpdate(dispatch: Function, userData: UserData){
    //await updateLista(dispatch, userData)
    await updateVolume(dispatch, userData)
}