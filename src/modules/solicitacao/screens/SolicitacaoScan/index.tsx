import React, { useCallback, useEffect, useRef, useState} from 'react'
import { StatusBar, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { RNCamera } from 'react-native-camera'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
//@ts-ignore
import Sound from 'react-native-sound'
import BarcodeMask from "react-native-barcode-mask"
import { showMessage } from "react-native-flash-message"
import { StackScreenProps } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../../interfaces/SolicitacaoRoutesParams'
import * as S from './styles'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { addScannedSolicitacao, setModalVisible, setScanning } from '../../reducers/solicitacaoCamera/solicitacaoCameraReducer'
import Render from '../../../../components/Screen/Render'
import Form from './components/Form'
import info from '../../../../utils/info'
import sleep from '../../../../utils/sleep'
//@ts-ignore
import BeepSuccess from '../../../../assets/audio/beep.mp3'

Sound.setCategory('Playback')

const beepAudio = new Sound(BeepSuccess, error => {
    if(error){
        info.error('beepAudio',error)
        return
    }
})

const SolicitacaoScan: React.FC <StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoScan'>> = ({ navigation }) => {

    const cameraRef = useRef<RNCamera>(null)
    const dispatch = useAppDispatch()
    const { isScanning, modalVisible, scannedSolicitacoes } = useAppSelector(s => s.solicitacaoCamera)
    const [scannedCode, setScannedCode] = useState<string | null>(null)

    const handleScan = useCallback(async () => {
        dispatch(setScanning(true))
        
        beepAudio.play()
        if(!scannedSolicitacoes.includes(scannedCode!)){
            dispatch(addScannedSolicitacao(scannedCode!))
            showMessage({
                message: 'Código lido com sucesso!',
                type: 'success',
                statusBarHeight: StatusBar.currentHeight,
            })
            await sleep(300)
        }else{
            showMessage({
                message: 'Código já inserido!',
                type: 'danger',
                statusBarHeight: StatusBar.currentHeight,
            })
        }
        
        dispatch(setScanning(false))
    }, [scannedCode])

    useEffect(() => {
        if(!!scannedCode) handleScan()
    }, [scannedCode])

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', translucent: true}} paddingBottom = {0}>
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
                    onBarCodeRead = {code => {
                        if(!isScanning && !modalVisible) setScannedCode(code.data)
                    }}
                >
                    <BarcodeMask 
                        height = {100}
                        showAnimatedLine = {false}
                    />
                </RNCamera>
                <S.ScanControlsContainer>
                    <TouchableOpacity onPress = {() => navigation.goBack()}>
                        <MaterialCommunityIcons name = "close" size = {24} color = "#fff" />
                    </TouchableOpacity>
                    <Text style = {{color: '#fff', fontWeight: 'bold'}}>{`${scannedSolicitacoes.length} códigos scaneados`}</Text>
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