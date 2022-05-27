import { Alert } from 'react-native'
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation'
import { setAppLocation } from '../../reducers/appReducer'
import { backGroundGeolocationOptions } from './backgroundGeolocationOptions'
import info from '../../../../utils/info'

export default async function getBackgroundGeolocation(dispatch: Function){
    try {
        BackgroundGeolocation.removeAllListeners()

        BackgroundGeolocation.on('authorization', (status) => {
            if (status !== BackgroundGeolocation.AUTHORIZED) {
                setTimeout(() =>
                    Alert.alert('O aplicativo requer permissão de localização.', 'Deseja abrir as configurações do aplicativo?', [
                        { text: 'Não', onPress: () => console.log('No Pressed'), style: 'cancel' },
                        { text: 'Sim', onPress: () => BackgroundGeolocation.showAppSettings() }
                    ]
                ), 1000)
            }
        })

        BackgroundGeolocation.configure(backGroundGeolocationOptions)

        BackgroundGeolocation.on('location', async ({ latitude, longitude }) => {
            dispatch(setAppLocation([latitude, longitude]))
            
            BackgroundGeolocation.startTask(taskKey => BackgroundGeolocation.endTask(taskKey))
        })

        BackgroundGeolocation.on('start', () => console.log('[INFO] BackgroundGeolocation has been started'))
        BackgroundGeolocation.start()
    } catch (error) {
        info.error('BackgroundGeolocation:', error)
    }
}