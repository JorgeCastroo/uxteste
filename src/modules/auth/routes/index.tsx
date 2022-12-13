import React, { useEffect, useState } from 'react'
import { PermissionsAndroid } from 'react-native'
import LocationEnabler from 'react-native-location-enabler'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { AuthRoutesParams } from '../interfaces/AuthRoutesParams'
import AuthLocation from '../screens/AuthLocation'
import AuthLogin from '../screens/AuthLogin'
import AuthCode from '../screens/AuthCode'


const { PRIORITIES: { HIGH_ACCURACY }, useLocationSettings } = LocationEnabler

const AuthRoutes: React.FC = () => {

    const [locationEnabled, setLocationEnabled] = useState<boolean | undefined>(undefined)
    const [gpsEnabled] = useLocationSettings({
        priority: HIGH_ACCURACY,
        alwaysShow: true,
        needBle: true,
    }, false)

    const Stack = createStackNavigator<AuthRoutesParams>()

    useEffect(() => {
        (async() => {
            setLocationEnabled(await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION))
        })()
    }, [])

    return(

        <Stack.Navigator
            initialRouteName = {(gpsEnabled && locationEnabled === true) ? 'authCode'  : 'authLocation'}
            screenOptions = {{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen name = "authCode" component={AuthCode} />
            <Stack.Screen name = "authLocation" component = {AuthLocation} />
            <Stack.Screen name = "authLogin" component = {AuthLogin} />
        </Stack.Navigator>

    )

}

export default AuthRoutes