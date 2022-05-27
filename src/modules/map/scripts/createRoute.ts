import polyline from "google-polyline"
import { setRoute } from "../reducers/mapReducer"
import info from "../../../utils/info"

export default function createRoute(dispatch: Function, route: string){
    try {
        const decoded = polyline.decode(route)
        decoded.forEach(coords => coords.reverse())

        dispatch(setRoute({
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: decoded
                    }
                }
            ]
        }))
    } catch (error) {
        info.error('createRoute',error)
    }
}