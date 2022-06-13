import Geolocation, { GeoPosition } from 'react-native-geolocation-service'
import { setAppLocation } from '../../reducers/appReducer'
import info from '../../../../utils/info'

function getGeolocation(dispatch: Function){
    Geolocation.getCurrentPosition(
        (position) => {
            info.data('getGeolocation', position)
            dispatch(setAppLocation(position))
        },
        (error) => {
            info.error('getGeolocation', `${error.code, error.message}`)
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 }
    )
}

function getCoords(position: GeoPosition){
    return { latitude: position.coords.latitude, longitude: position.coords.longitude }
}

export { getGeolocation, getCoords }