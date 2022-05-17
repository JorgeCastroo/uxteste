import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppRoutesParams } from '../interfaces/AppRoutesParams'
import Tabbar from '../components/Tabbar'
import Home from '../../home/screens/Home'
import ColetasRoutes from '../../coletas/routes'

const AppRoutes: React.FC = () => {

    const Tab = createBottomTabNavigator<AppRoutesParams>()

    return(

        <Tab.Navigator
            initialRouteName = "coletasRoutes"
            screenOptions = {{
                headerShown: false
            }}
            tabBar = {props => <Tabbar {...props} />}
        >
            <Tab.Screen name = "home" component = {Home} />
            <Tab.Screen name = "coletasRoutes" component = {ColetasRoutes} />
        </Tab.Navigator>

    )

}

export default AppRoutes