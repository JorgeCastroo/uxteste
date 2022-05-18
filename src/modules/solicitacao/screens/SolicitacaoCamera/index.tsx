import React, { useEffect, useRef, useState } from 'react'
import { RNCamera } from 'react-native-camera'
//@ts-ignore
import Sound from 'react-native-sound'
import BarcodeMask from "react-native-barcode-mask"
import { StackScreenProps } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../../interfaces/SolicitacaoRoutesParams'
import Render from '../../../../components/Screen/Render'
//@ts-ignore
import Beep from '../../../../assets/audio/beep.mp3'
import info from '../../../../utils/info'
import sleep from '../../../../utils/sleep'

Sound.setCategory('Playback')

const beepAudio = new Sound(Beep, error => {
    if(error){
        info.error('beepAudio',error)
        return
    }
})

const SolicitacaoCamera: React.FC <StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoCamera'>> = ({ navigation }) => {

    const cameraRef = useRef<RNCamera>(null)
    const [scanCode, setScanCode] = useState<string | null>(null)

    useEffect(() => {
        (async() => {
            if(!!scanCode){
                beepAudio.play()
                await sleep(300)
                navigation.goBack()
            }
        })()
    }, [scanCode])

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
                    onBarCodeRead = {code => setScanCode(code.data)}
                >
                    <BarcodeMask />
                </RNCamera>
            </Render>
        </>

    )

}

export default SolicitacaoCamera