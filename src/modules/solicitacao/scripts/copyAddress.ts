import Clipboard from "@react-native-community/clipboard"
import Snackbar from "react-native-snackbar"
import { Endereco } from "../interfaces/Lista"
import getFullAddress from "./getFullAddress"

export default function copyAddress(endereco: Endereco){
    Clipboard.setString(getFullAddress(endereco))
    Snackbar.show({
        text: 'Endereço copiado',
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Roboto-Regular',
        action: { text: 'Ok' }
    })
}