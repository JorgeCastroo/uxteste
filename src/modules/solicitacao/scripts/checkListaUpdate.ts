import { UserData } from "../../../interfaces/UserData"
import updateLista from "./requests/requestUpdateLista"

export default async function checkListaUpdate(dispatch: Function, userData: UserData){
    await updateLista(dispatch, userData)
}