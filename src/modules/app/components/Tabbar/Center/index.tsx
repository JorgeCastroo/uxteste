import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabCenterItemProps } from './types'
import { CenterItem, CenterItemTouchable } from '../styles'

const TabCenterItem: React.FC <TabCenterItemProps> = ({ onPress }) => {

    return(

        <CenterItem>
            <CenterItemTouchable onPress = {onPress}>
                <MaterialCommunityIcons name = "map-marker" size = {28} color = "#fff" />
            </CenterItemTouchable>
        </CenterItem>

    )

}

export default TabCenterItem