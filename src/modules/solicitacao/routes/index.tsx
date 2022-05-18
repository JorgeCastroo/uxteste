import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../interfaces/SolicitacaoRoutesParams'
import SolicitacaoList from '../screens/SolicitacaoList'
import SolicitacaoReceivement from '../screens/SolicitacaoReceivement'
import SolicitacaoCode from '../screens/SolicitacaoCode'
import SolicitacaoCamera from '../screens/SolicitacaoCamera'

const SolicitacaoRoutes: React.FC = () => {

    const Stack = createStackNavigator<SolicitacaoRoutesParams>()

    return(

        <Stack.Navigator
            initialRouteName = "solicitacaoList"
            screenOptions = {{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen name = "solicitacaoList" component = {SolicitacaoList} />
            <Stack.Screen name = "solicitacaoReceivement" component = {SolicitacaoReceivement} />
            <Stack.Screen name = "solicitacaoCode" component = {SolicitacaoCode} />
            <Stack.Screen name = "solicitacaoCamera" component = {SolicitacaoCamera} />
        </Stack.Navigator>

    )

}

export default SolicitacaoRoutes