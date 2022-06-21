import React, { useEffect, useRef } from 'react'
import { RNCamera } from 'react-native-camera'
import BarcodeMask from "react-native-barcode-mask"
import { StackScreenProps } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../../interfaces/SolicitacaoRoutesParams'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { setScanFlashlight, setScanLayout } from '../../reducers/solicitacaoScan/solicitacaoScanReducer'
import Render from '../../../../components/Screen/Render'
import Form from './components/Form'
import Header from './components/Header'
import Control from './components/Control'
import handleScan from './scripts/handleScan'
import { checkIfInside } from './scripts/checkBounds'

const SolicitacaoScan: React.FC <StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoScan'>> = ({ navigation }) => {

    const cameraRef = useRef<RNCamera>(null)
    const dispatch = useAppDispatch()
    const { currentVolumes } = useAppSelector(s => s.lista)
    const { isScanning, modalVisible, scannedSolicitacoes, scanMode, scanFlashlight, scanLayout } = useAppSelector(s => s.solicitacaoScan)

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
                    onGoogleVisionBarcodesDetected = {({ barcodes = [] }) => {
                        if(!isScanning && !modalVisible && barcodes.length > 0){
                            const isInside = checkIfInside(scanLayout!, {
                                ...barcodes[0].bounds.size, 
                                ...barcodes[0].bounds.origin,
                            })
                            const modeCheck = scanMode === 'QR_CODE' ? barcodes[0].format === 'QR_CODE' : true
                            if(isInside && modeCheck) handleScan(dispatch, barcodes[0], scannedSolicitacoes, currentVolumes!)
                        }
                    }}
                >
                    <BarcodeMask 
                        width = {260}
                        height = {scanMode === RNCamera.Constants.BarCodeType.qr ? 260 : 100}
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