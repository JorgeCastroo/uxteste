import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { AuthRoutesParams } from '../interfaces/AuthRoutesParams'
import AuthLoginIndex from '../screens/AuthLoginIndex'

const AuthRoutes: React.FC = () => {

    const Stack = createStackNavigator<AuthRoutesParams>()

    return(

        <Stack.Navigator
            initialRouteName = 'authLoginIndex'
            screenOptions = {{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen name = "authLoginIndex" component = {AuthLoginIndex} />
        </Stack.Navigator>

    )

}

export default AuthRoutes