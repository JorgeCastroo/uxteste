import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppRoutesParams } from '../interfaces/AppRoutesParams'
import Home from '../../home/screens/Home'

const AppRoutes: React.FC = () => {

    const Tab = createBottomTabNavigator<AppRoutesParams>()

    return(

        <Tab.Navigator
            initialRouteName = "home"
            screenOptions = {{
                headerShown: false
            }}
        >
            <Tab.Screen name = "home" component = {Home} />
        </Tab.Navigator>

    )

}

export default AppRoutes