import React from 'react'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BoxProps } from '../types'
import * as S from '../styles'
import { elevation } from '../../../../../styles/layout'
import Container from '../../../../../components/Container'

const BoxInfo: React.FC <BoxProps> = ({ icon, color, text }) => {

    return(

        <S.InfoBox style = {elevation.elevation4}>
            <MaterialCommunityIcons name = {icon} size = {24} color = {color} />
            {typeof text === 'object' && (
                <Container type = 'row' marginTop = {14} padding = {false} between>
                    {text.map((item, index) => (
                        <Text key = {index} style = {{color, fontSize: 18}}>{item}</Text>
                    ))}
                </Container>
            )}
            {typeof text === 'string' && (
                <Container marginTop = {14} center>
                    <Text style = {{color, fontSize: 18}}>{text}</Text>
                </Container>
            )}
        </S.InfoBox>

    )

}

export default BoxInfo