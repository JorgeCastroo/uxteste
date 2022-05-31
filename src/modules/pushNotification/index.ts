import OneSignal from "react-native-onesignal";
import { PUSH_NOTIFICATION_ID } from "@env";

export const initPushNotification = (userId: number) => {
    
    OneSignal.setLogLevel(6, 0)
    OneSignal.setAppId(`${PUSH_NOTIFICATION_ID}`)
    OneSignal.setExternalUserId(userId.toString())
    OneSignal.sendTag("user", userId.toString())

    OneSignal.setNotificationOpenedHandler(notification => {
        console.log("OneSignal: notification opened: ", notification);
    });
}