import React, { useCallback, useEffect, useRef } from 'react'
import { StatusBar, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { RNCamera } from 'react-native-camera'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Sound from 'react-native-sound'
import BarcodeMask from "react-native-barcode-mask"
import { showMessage } from "react-native-flash-message"
import { StackScreenProps } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../../interfaces/SolicitacaoRoutesParams'
import * as S from './styles'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { addScannedSolicitacao, setModalVisible, setScanLayout, setScanning } from '../../reducers/solicitacaoScan/solicitacaoScanReducer'
import Render from '../../../../components/Screen/Render'
import Form from './components/Form'
import Header from './components/Header'
import info from '../../../../utils/info'
import sleep from '../../../../utils/sleep'
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
    const { isScanning, modalVisible, scannedSolicitacoes, scanMode } = useAppSelector(s => s.solicitacaoScan)

    const handleScan = useCallback(async (code: string, scanned: string[]) => {
        dispatch(setScanning(true))
        if(currentVolumes!.map(item => item.etiqueta).includes(code)){
            if(!scanned.includes(code)){
                dispatch(addScannedSolicitacao(code))
                beepSuccess.play()
                showMessage({
                    message: 'Código lido com sucesso!',
                    type: 'success',
                    statusBarHeight: StatusBar.currentHeight,
                })
            }else{
                beepError.play()
                showMessage({
                    message: 'Código já inserido!',
                    type: 'danger',
                    statusBarHeight: StatusBar.currentHeight,
                })
            }
        }else{
            beepError.play()
            showMessage({
                message: 'Código não existe nos volumes!',
                type: 'danger',
                statusBarHeight: StatusBar.currentHeight,
            })
        }
        await sleep(3000)
        dispatch(setScanning(false))
    }, [])

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', translucent: true}} paddingBottom = {0}>
                <Header />
                <RNCamera
                    ref = {cameraRef}
                    type = {RNCamera.Constants.Type.back}
                    style = {{width: '100%', height: '100%'}}
                    flashMode = {RNCamera.Constants.FlashMode.off}
                    captureAudio = {false}
                    androidCameraPermissionOptions = {{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    //barCodeTypes = {[scanMode as any]} //! REMOVE IN PROD
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
                <S.ScanControlsContainer>
                    <TouchableOpacity onPress = {() => navigation.goBack()}>
                        <MaterialCommunityIcons name = "close" size = {24} color = "#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => scannedSolicitacoes .length > 0 && navigation.navigate('solicitacaoScanList')}>
                        <Text style = {{color: '#fff', fontWeight: 'bold'}}>{`${scannedSolicitacoes.length} códigos scaneados`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => dispatch(setModalVisible(true))}>
                        <MaterialCommunityIcons name = "keyboard" size = {24} color = "#fff" />
                    </TouchableOpacity>
                </S.ScanControlsContainer>
            </Render>
            <Form />
        </>

    )

}

export default SolicitacaoScan