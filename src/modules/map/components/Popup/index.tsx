import React from 'react'
import { Text } from 'react-native-paper'
import { Callout } from 'react-native-maps'
import { MapPopupProps } from './types'
import { elevation } from '../../../../styles/layout'
import { PopupContainer } from '../../screens/Map/styles'

const MapPopup: React.FC <MapPopupProps> = ({ text }) => {

    return(

        <Callout style = {[elevation.elevation4, { width: 140 }]} tooltip>
            <PopupContainer pad = "20px">
                <Text style = {{textAlign: 'center'}}>{text}</Text>
            </PopupContainer>
        </Callout>

    )

}

export default MapPopup