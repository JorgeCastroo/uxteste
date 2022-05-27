import BackgroundGeolocation, { ConfigureOptions } from "@mauron85/react-native-background-geolocation"
import themes from "../../../../styles/themes"

export const backGroundGeolocationOptions: ConfigureOptions = {
    desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    stationaryRadius: 10,
    distanceFilter: 10,
    notificationTitle: 'Aplicativo Conectado',
    notificationText: 'UX First Mile está ativo em segundo plano',
    notificationIconColor: themes.colors.primary,
    debug: false,
    startOnBoot: false,
    stopOnTerminate: true,
    locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    interval: 1000,
    fastestInterval: 1000,
    activitiesInterval: 500,
    stopOnStillActivity: false,
}