import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { List, Text } from 'react-native-paper'
import { SolicitacaoBoxProps } from './types'
import { Lista } from '../../interfaces/Lista'
import * as S from './styles'
import { elevation } from '../../../../styles/layout'
import themes from '../../../../styles/themes'
import { idStatusLista } from '../../../../constants/idStatusLista'

const BoxContent: React.FC <Lista> = lista => {
    
    const theme = themes.colors.tertiary
    const enderecoCompleto = `${lista.logradouro}, ${lista.numero}, ${lista.cep} - ${lista.bairro}`

    return(

        <>
            <S.PositionIndicator theme = {'#CCE0FF'}>
                <Text style = {{color: theme, fontSize: 16, fontWeight: 'bold'}}>1</Text>
            </S.PositionIndicator>
            <List.Item
                title = "Empresa"
                description = {`Quantidade ${lista.qtdeVolumes}`}
                left = {props => <List.Icon {...props} icon = "office-building" color = {theme} />}
            />
            <List.Item
                title = "Responsável"
                description = {lista.nomeResponsavel}
                left = {props => <List.Icon {...props} icon = "truck" color = {theme} />}
            />
            <List.Item
                title = "Endereço"
                description = {enderecoCompleto}
                left = {props => <List.Icon {...props} icon = "map-marker" color = {theme} />}
            />
            <S.StatusContainer theme = {'#CCE0FF'}>
                <Text style = {{color: theme, fontSize: 18, fontWeight: 'bold'}}>{Object.keys(idStatusLista).find(f => (idStatusLista as any)[f] === lista.situacao)}</Text>
            </S.StatusContainer>
        </>

    )

}

const SolicitacaoBox: React.FC <SolicitacaoBoxProps & Lista> = ({ onPress, ...props }) => {

    return(

        <>
            {(!!onPress && (
                <TouchableOpacity style = {[S.styles.Box, elevation.elevation4]} onPress = {onPress}>
                    <BoxContent {...props} />
                </TouchableOpacity>
            )) || (
                <View style = {[S.styles.Box, elevation.elevation4]}>
                    <BoxContent {...props} />
                </View>
            )}
        </>

    )

}

export default SolicitacaoBox