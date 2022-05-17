import React from 'react'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as S from './styles'
import { elevation } from '../../../../styles/layout'
import Section from '../../../../components/Screen/Section'

const HomeMessage: React.FC = () => {

    return(

        <Section marginBottom = {40}>
            <S.Box style = {elevation.elevation4}>
                <S.Indicator>
                    <Text style = {{color: '#037E41', fontSize: 50, fontWeight: 'bold'}}>!</Text>
                </S.Indicator>
                <S.TextContainer>
                    <Text style = {{color: '#037E41', fontSize: 20, fontWeight: 'bold'}}>Novas coletas disponíveis</Text>
                </S.TextContainer>
                <S.IconArea onPress = {() => {}}>
                    <MaterialCommunityIcons name = 'chevron-right' size = {24} color = '#B3B3B3' />
                </S.IconArea>
            </S.Box>
        </Section>

    )

}

export default HomeMessage