import React, { useRef } from 'react'
import { FAB } from 'react-native-paper'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import themes from '../../../../styles/themes'
import Render from '../../../../components/Screen/Render'
import Header from '../../../../components/Screen/Header'

const Map: React.FC = () => {

    const mapRef = useRef<MapView>(null)

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} paddingBottom = {0}>
                <Header title = "Destinatários" goBack = {false} />
                <MapView
                    ref = {mapRef}
                    provider = {PROVIDER_GOOGLE}
                    style = {{width: '100%', height: '100%'}}
                    loadingEnabled = {false}
                    showsMyLocationButton = {false}
                    showsUserLocation
                    showsCompass
                    rotateEnabled = {false}
                    pitchEnabled = {false}
                    userLocationUpdateInterval = {1000}
                ></MapView>
                <FAB
                    icon = "map-marker-multiple"
                    color = {themes.colors.primary}
                    style = {{position: 'absolute', bottom: 20, right: 20, backgroundColor: '#fff'}}
                    onPress = {() => {}}
                />
            </Render>
        </>

    )

}

export default Map