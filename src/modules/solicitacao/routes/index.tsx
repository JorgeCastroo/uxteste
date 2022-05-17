import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../interfaces/SolicitacaoRoutesParams'
import SolicitacaoList from '../screens/SolicitacaoList'

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
        </Stack.Navigator>

    )

}

export default SolicitacaoRoutes