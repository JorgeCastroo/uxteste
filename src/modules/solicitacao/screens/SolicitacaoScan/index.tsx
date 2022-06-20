import React, { useCallback, useEffect, useRef } from 'react'
import { StatusBar } from 'react-native'
import { RNCamera } from 'react-native-camera'
import Sound from 'react-native-sound'
import BarcodeMask from "react-native-barcode-mask"
import { showMessage } from "react-native-flash-message"
import { StackScreenProps } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../../interfaces/SolicitacaoRoutesParams'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { addScannedSolicitacao, setScanFlashlight, setScanning } from '../../reducers/solicitacaoScan/solicitacaoScanReducer'
import Render from '../../../../components/Screen/Render'
import Form from './components/Form'
import Header from './components/Header'
import Control from './components/Control'
import info from '../../../../utils/info'
import sleep from '../../../../utils/sleep'
import { updateVolume } from '../../reducers/lista/listaReducer'
//@ts-ignore
import BeepSuccessAudio from '../../../../assets/audio/beep_success.mp3'
//@ts-ignore
import BeepErrorAudio from '../../../../assets/audio/beep_error.mp3'

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

const SolicitacaoScan: React.FC <StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoScan'>> = ({ navigation }) => {

    const cameraRef = useRef<RNCamera>(null)
    const dispatch = useAppDispatch()
    const { currentVolumes } = useAppSelector(s => s.lista)
    const { isScanning, modalVisible, scannedSolicitacoes, scanMode, scanFlashlight } = useAppSelector(s => s.solicitacaoScan)

    const handleScan = useCallback(async (code: string, scanList: string[]) => {
        dispatch(setScanning(true))
        let flashMessage = { message: '', type: '' }
        if(currentVolumes!.map(item => item.etiqueta).includes(code)){
            if(!scanList.includes(code)){
                dispatch(addScannedSolicitacao(code))
                dispatch(updateVolume(code))
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
        showMessage({...flashMessage as any, statusBarHeight: StatusBar.currentHeight })
        await sleep(3000)
        dispatch(setScanning(false))
    }, [])

    useEffect(() => {
        return () => {
            dispatch(setScanFlashlight(false))
        }
    }, [dispatch])

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', translucent: true}} paddingBottom = {0}>
                <Header />
                <RNCamera
                    ref = {cameraRef}
                    type = {RNCamera.Constants.Type.back}
                    style = {{width: '100%', height: '100%'}}
                    flashMode = {RNCamera.Constants.FlashMode[scanFlashlight ? 'torch' : 'off']}
                    captureAudio = {false}
                    androidCameraPermissionOptions = {{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    barCodeTypes = {scanMode === 'QR_CODE' ? [scanMode] as any : undefined}
                    onBarCodeRead = {code => {
                        if(!isScanning && !modalVisible) handleScan(code.data, scannedSolicitacoes)
                    }}
                >
                    <BarcodeMask 
                        width = {260}
                        height = {scanMode === RNCamera.Constants.BarCodeType.qr ? 260 : 100}
                        showAnimatedLine = {false}
                        //onLayoutMeasured = {({ nativeEvent: { layout } }) => dispatch(setScanLayout(layout))}
                    />
                </RNCamera>
                <Control navigation = {navigation} />
            </Render>
            <Form />
        </>

    )

}

export default SolicitacaoScan