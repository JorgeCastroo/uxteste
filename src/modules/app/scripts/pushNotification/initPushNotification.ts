import { PUSH_NOTIFICATION_ID } from "@env"
import OneSignal from "react-native-onesignal"
import info from "../../../../utils/info"

export default function initPushNotification(userId: number){
    
    OneSignal.setLogLevel(6, 0)
    OneSignal.setAppId(PUSH_NOTIFICATION_ID)
    OneSignal.setExternalUserId(userId.toString())
    OneSignal.sendTag("user", userId.toString())

    OneSignal.setNotificationOpenedHandler(notification => {
        info.log("OneSignal: notification opened: ", notification)
    })
    
}