import React from 'react'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as S from './styles'
import themes from '../../../../styles/themes'
import { elevation } from '../../../../styles/layout'
import { useAppSelector } from '../../../../redux/hooks'
import Section from '../../../../components/Screen/Section'
import getNextEndereco from '../../../solicitacao/scripts/getNextEndereco'

const TopBox: React.FC = () => {

    const { lista } = useAppSelector(s => s.lista)
    const { roteirizacao } = useAppSelector(s => s.roteirizacao)

    const SHOW_DATA = !!lista && !!roteirizacao
    const message = SHOW_DATA ? getNextEndereco(lista, roteirizacao) ?? 'Sem destinatário' : 'Sem rota'

    return(

        <Section marginTop = {-29}>            
            <S.Box style = {elevation.elevation4}>
                <MaterialCommunityIcons
                    name = {SHOW_DATA ? `compass-outline` : 'compass-off-outline'} 
                    size = {24} 
                    color = {themes.colors.primary} 
                />
                <S.TextContainer>
                    <Text style = {{color: '#606165', fontSize: 22}} ellipsizeMode = "tail" numberOfLines = {1}>{message}</Text>
                </S.TextContainer>
            </S.Box>
        </Section>

    )

}

export default TopBox