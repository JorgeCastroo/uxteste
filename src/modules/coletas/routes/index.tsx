import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import { ColetasRoutesParams } from '../interfaces/ColetasRoutesParams'
import ColetasDownload from '../screens/ColetasDownload'
import ColetasList from '../screens/ColetasList'

const ColetasRoutes: React.FC = () => {

    const Stack = createStackNavigator<ColetasRoutesParams>()

    return (

        <Stack.Navigator
            initialRouteName="coletasDownload"
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen name="coletasDownload" component={ColetasDownload} />
            <Stack.Screen name="coletasList" component={ColetasList} />
        </Stack.Navigator>

    )

}

export default ColetasRoutes