import React from 'react'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ButtonProps } from './types'
import * as S from './styles'

const Button: React.FC <ButtonProps> = ({ active, label, icon, onPress }) => {

    const color = active ? '#FFF' : '#ffffffcc'

    return(

        <S.IconTouchable theme = {active} onPress = {onPress}>
            <>
                <MaterialCommunityIcons name = {icon} size = {24} color = {color} />
                <Text style = {{marginLeft: 8, color, fontWeight: 'bold'}}>{label}</Text>
            </>
        </S.IconTouchable>

    )

}

export default Button