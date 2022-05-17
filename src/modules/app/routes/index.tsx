import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppRoutesParams } from '../interfaces/AppRoutesParams'
import Tabbar from '../components/Tabbar'
import Home from '../../home/screens/Home'
import Map from '../../map/screens/Map'
import ColetasRoutes from '../../coletas/routes'
import SolicitacaoRoutes from '../../solicitacao/routes'

const AppRoutes: React.FC = () => {

    const Tab = createBottomTabNavigator<AppRoutesParams>()

    return(

        <Tab.Navigator
            initialRouteName = "home"
            screenOptions = {{
                headerShown: false
            }}
            tabBar = {props => <Tabbar {...props} />}
        >
            <Tab.Screen name = "home" component = {Home} />
            <Tab.Screen name = "map" component = {Map} />
            <Tab.Screen name = "solicitacaoRoutes" component = {SolicitacaoRoutes} />
            <Tab.Screen name = "coletasRoutes" component = {ColetasRoutes} />
        </Tab.Navigator>

    )

}

export default AppRoutes