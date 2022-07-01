import { StatusBar } from "react-native"
import { Barcode } from "react-native-camera"
import { showMessage } from "react-native-flash-message"
import Sound from "react-native-sound"
import { ListaVolume } from "../../../interfaces/Lista"
import { addScannedSolicitacao, setScanning } from "../../../reducers/solicitacaoScan/solicitacaoScanReducer"
import { updateEnderecoVolume } from "../../../reducers/lista/listaReducer"
import info from "../../../../../utils/info"
import sleep from "../../../../../utils/sleep"
//@ts-ignore
import BeepSuccessAudio from '../../../../../assets/audio/beep_success.mp3'
//@ts-ignore
import BeepErrorAudio from '../../../../../assets/audio/beep_error.mp3'

Sound.setCategory('Playback')

const beepSuccess = new Sound(BeepSuccessAudio, error => {
    if(error){
        info.error('beepSuccess',error)
        return
    }
})

const beepError = new Sound(BeepErrorAudio, error => {
    if(error){
        info.error('beepError',error)
        return
    }
})

export default async function handleScan(dispatch: Function, code: Barcode, scanList: string[], currentVolumes: ListaVolume[]){
    try {
        dispatch(setScanning(true))
        let flashMessage = { message: '', type: '' }
        if(currentVolumes.map(item => item.etiqueta).includes(code.data)){
            if(!scanList.includes(code.data)){
                dispatch(addScannedSolicitacao(code.data))
                dispatch(updateEnderecoVolume(code.data))

                beepSuccess.play()
                flashMessage = { message: 'Código lido com sucesso!', type: 'success' }
            }else{
                beepError.play()
                flashMessage = { message: 'Código já lido!', type: 'danger' }
            }
        }else{
            beepError.play()
            flashMessage = { message: 'Código não encontrado!', type: 'danger' }
        }
        showMessage({
            ...flashMessage as any,
            statusBarHeight: StatusBar.currentHeight
        })
        await sleep(2000)
    } catch (error) {
        info.error('handleScan',error)
    } finally {
        dispatch(setScanning(false))
    }
}