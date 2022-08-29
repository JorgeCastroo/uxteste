import { showMessage } from "react-native-flash-message"
import { UserData } from "../../../interfaces/UserData"
import NetworkUtils from "../../../utils/info/network"
import updateLista from "./requests/requestUpdateLista"

export default async function checkListaUpdate(dispatch: Function, userData: UserData){
    
    const isConnected = await NetworkUtils.isNetworkAvailable()

    if (!isConnected){
        showMessage({
            message: "Sem conexão com a internet!",
            type: "danger",
            duration: 10000,
            autoHide: false,
            floating: true,
        })

        return;
    }

    await updateLista(dispatch, userData)
}