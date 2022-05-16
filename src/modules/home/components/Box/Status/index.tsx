import React from 'react'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BoxProps } from '../types'
import * as S from '../styles'
import { elevation } from '../../../../../styles/layout'
import Container from '../../../../../components/Container'

const BoxStatus: React.FC <BoxProps> = ({ icon, color, text }) => {

    return(

        <S.StatusBox style = {elevation.elevation4}>
            <MaterialCommunityIcons name = {icon} size = {24} color = {color} />
            <Container marginTop = {8} center>
                <Text style = {{color, fontSize: 18}}>{text}</Text>
            </Container>
        </S.StatusBox>

    )

}

export default BoxStatus