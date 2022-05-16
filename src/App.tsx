import React from 'react'
import { Provider as ReduxProvider } from "react-redux"
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer as NavigationProvider } from '@react-navigation/native'
import store from './redux/store'
import Routes from './routes'

const App: React.FC = () => {

    return(

        <ReduxProvider store = {store}>
            <NavigationProvider>
                <PaperProvider>
                    <Routes />
                </PaperProvider>
            </NavigationProvider>
        </ReduxProvider>

    )

}

export default App