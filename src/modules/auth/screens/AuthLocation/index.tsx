import React, { useCallback, useEffect, useState } from 'react'
import { PERMISSIONS, request } from 'react-native-permissions'
import AutoHeightImage from 'react-native-auto-height-image'
import { Text } from 'react-native-paper'
import { PermissionsAndroid } from 'react-native'
import LocationEnabler from 'react-native-location-enabler'
import { StackScreenProps } from '@react-navigation/stack'
import { AuthRoutesParams } from '../../interfaces/AuthRoutesParams'
import * as S from './styles'
import themes from '../../../../styles/themes'
import Render from '../../../../components/Screen/Render'
import Section from '../../../../components/Screen/Section'
import Button from '../../../../components/Button'
import Container from '../../../../components/Container'
import info from '../../../../utils/info'

const { PRIORITIES: { HIGH_ACCURACY }, useLocationSettings } = LocationEnabler

const AuthLocation: React.FC <StackScreenProps<AuthRoutesParams, 'authLocation'>> = ({ navigation }) => {

    const [permited, setPermited] = useState(false)
    const [gpsEnabled, setGpsEnabled] = useLocationSettings({
        priority: HIGH_ACCURACY,
        alwaysShow: true,
        needBle: true,
    }, false)

    const locationPermission = useCallback(async (thisRequest = false) => {
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
            if(granted === PermissionsAndroid.RESULTS.GRANTED) navigation.navigate('authLogin')
        } catch (error) { 
            info.error('locationPermission',error)
        }
    }, [])

    const requestAlways = useCallback(async () => {
        const result = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION)
        if (result === 'granted') setPermited(true)
    }, [])

    useEffect(() => {
        (async () => {
            const alreadyPermited = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (gpsEnabled && alreadyPermited) navigation.navigate('authLogin')
        })()
    }, [gpsEnabled])

    return(

        <>
            <Render
                statusBarOptions = {{ barStyle: 'dark-content', backgroundColor: '#F2F2F2' }} 
                wrapperColor = '#fff'
                paddingBottom = {20}
            >
                <S.Header />
                <Section marginTop = {-128} center>
                    <AutoHeightImage
                        source = {require('../../../../assets/images/mapa.png')}
                        width = {168}
                    />
                </Section>
                <Section marginTop = {40} center>
                    <Text style = {{marginBottom: 20, color: '#333333', fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Ei, vamos precisar da sua localização</Text>
                    <Text style = {{color: '#333333', fontSize: 16, textAlign: 'center'}}>O app coleta dados de localização para ativar o cálculo de distância e rastreamento do motorista, mesmo quando o app não está em uso.</Text>
                </Section>
                <Section marginTop = {40}>
                    {!gpsEnabled && (
                        <Container marginBottom = {10} padding = {false} center>
                            <Text style = {{color: themes.status.error.primary, fontSize: 16, fontWeight: 'bold'}}>Para continuarmos ative o seu GPS</Text>
                        </Container>
                    )}
                    <Button
                        label = {gpsEnabled ? "GPS Ativo" : "Ativar GPS"}
                        marginBottom = {20}
                        color = {gpsEnabled ? [themes.status.success.primary, themes.status.success.secondary] : undefined}
                        onPress = {setGpsEnabled}
                    />
                    {gpsEnabled && (
                        <Button
                            label = "Permitir acesso à localização"
                            onPress = {locationPermission}
                        />
                    )}
                </Section>
            </Render>
        </>

    )

}

export default AuthLocation