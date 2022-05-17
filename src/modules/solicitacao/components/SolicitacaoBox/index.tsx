import React from 'react'
import { List, Text } from 'react-native-paper'
import * as S from './styles'
import { elevation } from '../../../../styles/layout'
import themes from '../../../../styles/themes'
import { SolicitacaoBoxProps } from './types'
import { TouchableOpacity, View } from 'react-native'

const BoxContent: React.FC = () => {
    
    const theme = themes.colors.tertiary

    return(

        <>
            <S.PositionIndicator theme = {'#CCE0FF'}>
                <Text style = {{color: theme, fontSize: 16, fontWeight: 'bold'}}>1</Text>
            </S.PositionIndicator>
            <List.Item
                title = "Empresa"
                description = "Quantidade 10"
                left = {props => <List.Icon {...props} icon = "office-building" color = {theme} />}
            />
            <List.Item
                title = "Responsável"
                description = "Nome do Responsável"
                left = {props => <List.Icon {...props} icon = "truck" color = {theme} />}
            />
            <List.Item
                title = "Endereço"
                description = "Rua Teste Fulano Placeholder 12345-678 SP"
                left = {props => <List.Icon {...props} icon = "map-marker" color = {theme} />}
            />
            <S.StatusContainer theme = {'#CCE0FF'}>
                <Text style = {{color: theme, fontSize: 18, fontWeight: 'bold'}}>STATUS SOLICITAÇÃO</Text>
            </S.StatusContainer>
        </>

    )

}

const SolicitacaoBox: React.FC <SolicitacaoBoxProps> = ({ onPress }) => {

    return(

        <>
            {(!!onPress && (
                <TouchableOpacity style = {[S.styles.Box, elevation.elevation4]} onPress = {onPress}>
                    <BoxContent />
                </TouchableOpacity>
            )) || (
                <View style = {[S.styles.Box, elevation.elevation4]}>
                    <BoxContent />
                </View>
            )}
        </>

    )

}

export default SolicitacaoBox