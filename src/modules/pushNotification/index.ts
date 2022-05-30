import OneSignal from "react-native-onesignal";

export const initPushNotification = (userId: number) => {
    
    OneSignal.setLogLevel(6, 0)
    OneSignal.setAppId("81d839cf-0325-4a3b-8414-f3ac678e3939")
    OneSignal.setExternalUserId(userId.toString())
    OneSignal.sendTag("user", userId.toString())

    OneSignal.setNotificationOpenedHandler(notification => {
        console.log("OneSignal: notification opened: ", notification);
    });
}