import OneSignal from "react-native-onesignal"

export default function closePushNotifications(){
    OneSignal.deleteTag("user")
    OneSignal.removeExternalUserId()
}