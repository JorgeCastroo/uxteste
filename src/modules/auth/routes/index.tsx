import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { AuthRoutesParams } from '../interfaces/AuthRoutesParams'
import AuthLocation from '../screens/AuthLocation'
import AuthLogin from '../screens/AuthLogin'

const AuthRoutes: React.FC = () => {

    const Stack = createStackNavigator<AuthRoutesParams>()

    return(

        <Stack.Navigator
            initialRouteName = 'authLogin'
            screenOptions = {{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen name = "authLocation" component = {AuthLocation} />
            <Stack.Screen name = "authLogin" component = {AuthLogin} />
        </Stack.Navigator>

    )

}

export default AuthRoutes