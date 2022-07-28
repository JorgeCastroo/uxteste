import Geolocation, { GeoPosition } from 'react-native-geolocation-service'
import { setAppLocation } from '../../reducers/appReducer'
import info from '../../../../utils/info'

async function getGeolocation(dispatch: Function){
    let positionReturn: Geolocation.GeoPosition | undefined
    Geolocation.getCurrentPosition(
        (position) => {
            info.data('getGeolocation', position)
            dispatch(setAppLocation(position))
            positionReturn = position
        },
        (error) => {
            info.error('getGeolocation', `${error.code, error.message}`)
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 }
    )

    return positionReturn
}

function getCoords(position: GeoPosition){
    return { latitude: position.coords.latitude, longitude: position.coords.longitude }
}

export { getGeolocation, getCoords }