import React from 'react'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import * as S from './styles'
import { elevation } from '../../../../styles/layout'

const HomeMessage: React.FC = () => {

    const navigation = useNavigation<any>()

    return (

        <S.Box style = {elevation.elevation4} onPress = {() => navigation.navigate('coletasRoutes')}>
            <S.Indicator>
                <Text style = {{ color: '#037E41', fontSize: 50, fontWeight: 'bold' }}>!</Text>
            </S.Indicator>
            <S.TextContainer>
                <Text style = {{ color: '#037E41', fontSize: 20, fontWeight: 'bold' }}>Novas coletas disponíveis</Text>
            </S.TextContainer>
            <S.IconArea onPress = {() => navigation.navigate('coletasRoutes')}>
                <MaterialCommunityIcons name = 'chevron-right' size = {24} color = '#B3B3B3' />
            </S.IconArea>
        </S.Box>

    )

}

export default HomeMessage