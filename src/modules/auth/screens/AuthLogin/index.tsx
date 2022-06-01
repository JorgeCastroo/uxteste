import React, { useCallback, useEffect, useState } from 'react'
import { PermissionsAndroid, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { PERMISSIONS, request } from 'react-native-permissions'
import AutoHeightImage from 'react-native-auto-height-image'
import Render from '../../../../components/Screen/Render'
import Section from '../../../../components/Screen/Section'
import Form from './components/Form'
import info from '../../../../utils/info'
import AppVersion from '../../../app/components/AppVersion'

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
                        message: "O app UX First Mile coleta dados de local para ativar o recurso de cálculo de distância e rastreamento do motorista pela empresa",
                        buttonNegative: "Cancelar",
                        buttonPositive: "OK"
                    }
                )
                if(granted === PermissionsAndroid.RESULTS.GRANTED) setBlocked(false)
                else setBlocked(true)
            } catch (error) { 
                info.error('locationPermission',error)
            }
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
                align = "space-between"
            >
                <Section marginTop = {20} marginBottom = {40} center>
                    <AutoHeightImage
                        source = { require('../../../../assets/images/logo4.png') }
                        width = {200}
                    />
                </Section>
                {blocked && (
                    <Section padding = {false}>
                        <Section center>
                            <Text style = {{color: '#333333', fontSize: 20, textAlign: 'center'}}>Você tem que permitir a localização o tempo todo para usar o app!</Text>
                        </Section>
                        <Section marginTop = {20} center>
                            <TouchableOpacity onPress = {() => locationPermission(true)}>
                                <Text style = {{color: '#333333', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Permitir</Text>
                            </TouchableOpacity>
                        </Section>
                    </Section>
                )}
                {!blocked && <Form />}
                <AppVersion />
            </Render>
        </>

    )

}

export default AuthLogin