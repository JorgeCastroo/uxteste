import React, { useEffect, useRef } from 'react'
import { RNCamera } from 'react-native-camera'
import BarcodeMask from "react-native-barcode-mask"
import { StackScreenProps } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../../interfaces/SolicitacaoRoutesParams'
import themes from '../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { setScanFlashlight, setScanLayout, setScanVisible } from '../../reducers/solicitacaoScan/solicitacaoScanReducer'
import Render from '../../../../components/Screen/Render'
import Form from './components/Form'
import Header from './components/Header'
import Control from './components/Control'
import handleScan from './scripts/handleScan'
import checkFormat from './scripts/checkFormat'
import checkIfInside from './scripts/checkBounds'

const SolicitacaoScan: React.FC <StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoScan'>> = ({ navigation }) => {

    const cameraRef = useRef<RNCamera>(null)
    const dispatch = useAppDispatch()
    const { currentVolumes } = useAppSelector(s => s.lista)
    const { isScanning, modalVisible, scannedSolicitacoes, scanMode, scanFlashlight, scanLayout, scanVisible } = useAppSelector(s => s.solicitacaoScan)

    useEffect(() => {
        return () => {
            dispatch(setScanFlashlight(false))
            dispatch(setScanVisible(false))
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
                    onGoogleVisionBarcodesDetected = {({ barcodes = [] }) => {
                        if(barcodes.length > 0 && !modalVisible){
                            const isInside = checkIfInside(scanLayout!, {...barcodes[0].bounds.size, ...barcodes[0].bounds.origin})
                            if(isInside && checkFormat(scanMode, barcodes[0].format ?? '')){
                                dispatch(setScanVisible(true))
                                if(!isScanning) handleScan(dispatch, barcodes[0], scannedSolicitacoes, currentVolumes!)
                            }else dispatch(setScanVisible(false))
                        }else dispatch(setScanVisible(false))
                    }}
                >
                    <BarcodeMask 
                        width = {scanMode === RNCamera.Constants.BarCodeType.qr ? 260 : '90%'}
                        height = {scanMode === RNCamera.Constants.BarCodeType.qr ? 260 : 100}
                        edgeColor = {scanVisible ? themes.status.success.primary : '#fff'}
                        showAnimatedLine = {false}
                        onLayoutMeasured = {({ nativeEvent: { layout } }) => dispatch(setScanLayout(layout))}
                    />
                </RNCamera>
                <Control navigation = {navigation} />
            </Render>
            <Form />
        </>

    )

}

export default SolicitacaoScan