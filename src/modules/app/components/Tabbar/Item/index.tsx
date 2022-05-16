import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabItemProps } from './types'
import themes from '../../../../../styles/themes'
import { TouchableOpacity } from 'react-native'

const TabItem: React.FC <TabItemProps> = ({ icon, active, onPress }) => {

    return(

        <TouchableOpacity onPress = {onPress}>
            <MaterialCommunityIcons
                name = {icon} 
                size = {28} 
                color = {active ? themes.colors.primary : '#CBCBCB'} 
            />
        </TouchableOpacity>

    )

}

export default TabItem