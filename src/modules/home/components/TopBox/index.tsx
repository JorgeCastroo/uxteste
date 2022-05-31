import React, { useEffect } from 'react'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as S from './styles'
import themes from '../../../../styles/themes'
import { elevation } from '../../../../styles/layout'
import { useAppSelector } from '../../../../redux/hooks'
import Section from '../../../../components/Screen/Section'
import orderLista from '../../../solicitacao/scripts/orderLista'
import { idStatusLista } from '../../../../constants/idStatusLista'

const TopBox: React.FC = () => {

    const { lista } = useAppSelector(s => s.lista)
    const { roteirizacao } = useAppSelector(s => s.roteirizacao)

    const MESSAGE = !!lista && !!roteirizacao ? orderLista(lista, roteirizacao).find(f => f.situacao !== idStatusLista['FINALIZADO'])?.logradouro ?? 'Sem destinatário' : 'Sem rota'

    return(

        <Section marginTop = {-29}>            
            <S.Box style = {elevation.elevation4}>
                <MaterialCommunityIcons name = 'compass-outline' size = {24} color = {themes.colors.primary} />
                <S.TextContainer>
                    <Text style = {{color: '#606165', fontSize: 22}} ellipsizeMode = "tail" numberOfLines = {1}>{MESSAGE}</Text>
                </S.TextContainer>
            </S.Box>
        </Section>

    )

}

export default TopBox