import React from 'react'
import { LogBox } from 'react-native'
import { Provider as ReduxProvider } from "react-redux"
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer as NavigationProvider } from '@react-navigation/native'
import FlashMessage from "react-native-flash-message"
import store from './redux/store'
import Routes from './routes'
import theme from './constants/paper/theme'
import ModalAppVersion from './modules/app/components/ModalAppVersion'

const App: React.FC = () => {

    LogBox.ignoreLogs([
        'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
        'new NativeEventEmitter()` was called with a non-null argument without the required'
    ])

    return(

        <NavigationProvider>
            <ReduxProvider store = {store}>
                <PaperProvider theme = {theme}>
                    <Routes />
                    <ModalAppVersion />
                    <FlashMessage position = "top" />
                </PaperProvider>
            </ReduxProvider>
        </NavigationProvider>

    )

}

export default App