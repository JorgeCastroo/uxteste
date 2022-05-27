import React, { useCallback, useEffect, useState } from 'react'
import { PermissionsAndroid } from 'react-native'
import { Text } from 'react-native-paper'
import { PERMISSIONS, request } from 'react-native-permissions'
import AutoHeightImage from 'react-native-auto-height-image'
import Render from '../../../../components/Screen/Render'
import Section from '../../../../components/Screen/Section'
import Form from './components/Form'
import info from '../../../../utils/info'

const AuthLogin: React.FC = () => {

    const [blocked, setBlocked] = useState(false)

    const locationPermission = useCallback(async (thisRequest = false) => {
        const alreadyPermited = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION)
        if (!alreadyPermited && thisRequest) {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Permissão de localização",
                        message: "O app First Mile coleta dados de local para ativar o recurso de cálculo de distância e rastreamento do motorista pela empresa, mesmo quando o app está fechado ou não está em uso.",
                        buttonNegative: "Cancelar",
                        buttonPositive: "OK"
                    }
                )
                granted === PermissionsAndroid.RESULTS.GRANTED ? requestAlways() : setBlocked(true)
            } catch (error) { 
                info.error('locationPermission',error)
            }
        }
    }, [])

    const requestAlways = useCallback(async () => {
        try {
            const result = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION)
            if (result === 'denied'){
                locationPermission(true)
                setBlocked(true) 
            }else if (result === 'blocked') setBlocked(true)
        } catch (error) {
            info.error('requestAlways',error)
        }
    }, [])

    useEffect(() => {
        locationPermission(true)
    }, [])

    return(

        <>
            <Render 
                statusBarOptions = {{ barStyle: 'dark-content', backgroundColor: '#fff' }} 
                wrapperColor = '#fff'
                paddingBottom = {20}
            >
                <Section marginTop = {60} marginBottom = {110} center>
                    <AutoHeightImage
                        source = { require('../../../../assets/images/logo2.png') }
                        width = {240}
                    />
                </Section>
                {blocked && (
                    <Section center>
                        <Text style = {{color: '#333333', fontSize: 20, textAlign: 'center'}}>Você tem que permitir a localização o tempo todo para usar o app!</Text>
                    </Section>
                )}
                {!blocked && <Form />}
            </Render>
        </>

    )

}

export default AuthLogin