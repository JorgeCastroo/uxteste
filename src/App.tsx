import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import { Provider as ReduxProvider } from "react-redux"
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer as NavigationProvider } from '@react-navigation/native'
import FlashMessage from "react-native-flash-message"
import store from './redux/store'
import Routes from './routes'
import theme from './constants/paper/theme'
import { initPushNotification } from './modules/pushNotification'

const App: React.FC = () => {

    useEffect(() => {
        initPushNotification()
    }, [])

    LogBox.ignoreLogs([
        'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
    ])

    return (

        <NavigationProvider>
            <ReduxProvider store={store}>
                <PaperProvider theme={theme}>
                    <Routes />
                    <FlashMessage position="top" />
                </PaperProvider>
            </ReduxProvider>
        </NavigationProvider>

    )

}

export default App