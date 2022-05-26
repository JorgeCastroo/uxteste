import React from 'react'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as S from './styles'
import themes from '../../../../styles/themes'
import { elevation } from '../../../../styles/layout'
import Section from '../../../../components/Screen/Section'

const TopBox: React.FC = () => {

    return(

        <Section marginTop = {-29}>            
            <S.Box style = {elevation.elevation4}>
                <MaterialCommunityIcons name = 'compass-outline' size = {24} color = {themes.colors.primary} />
                <S.TextContainer>
                    <Text style = {{color: '#606165', fontSize: 22}}>Sem rota!</Text>
                </S.TextContainer>
            </S.Box>
        </Section>

    )

}

export default TopBox