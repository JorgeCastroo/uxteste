import React from 'react'
import { TouchableRipple } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SelectColetaBoxProps } from './types'
import * as S from '../styles'

const ColetaBoxSelect: React.FC <SelectColetaBoxProps> = ({ icon, color, onPress }) => {

    return(

        <TouchableRipple style = {{width: '50%'}} rippleColor = {color} onPress = {onPress}>
            <S.SelectBox>
                <MaterialCommunityIcons name = {icon} size = {26} color = {color} />
            </S.SelectBox>
        </TouchableRipple>

    )

}

export default ColetaBoxSelect