import Clipboard from "@react-native-community/clipboard"
import Snackbar from "react-native-snackbar"
import { Endereco } from "../interfaces/Lista"

export default function copySolicitacao(solicitacao: Endereco){
    Clipboard.setString(JSON.stringify(solicitacao))
    Snackbar.show({
        text: 'Solicitação copiada',
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Roboto-Regular',
        action: { text: 'Ok' }
    })
}