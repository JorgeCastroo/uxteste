import React from 'react'
import { List, Text } from 'react-native-paper'
import * as S from './styles'
import { elevation } from '../../../../styles/layout'
import themes from '../../../../styles/themes'
import { BoxContentProps, SolicitacaoBoxProps } from './types'
import { TouchableOpacity, View } from 'react-native'


const BoxContent: React.FC<BoxContentProps> = ({ coleta }) => {

    const theme = themes.colors.tertiary

    const endereco = `${coleta?.logradouro}, ${coleta?.bairro}, ${coleta?.cidade}, ${coleta?.complemento}.`

    return (

        <>
            <S.PositionIndicator theme={'#CCE0FF'}>
                <Text style={{ color: theme, fontSize: 16, fontWeight: 'bold' }}>1</Text>
            </S.PositionIndicator>
            <List.Item
                title="Empresa"
                description={coleta?.nomeCliente}
                left={props => <List.Icon {...props} icon="office-building" color={theme} />}
            />
            <List.Item
                title="Responsável"
                description={coleta?.nomeResponsavel}
                left={props => <List.Icon {...props} icon="truck" color={theme} />}
            />
            <List.Item
                title="Endereço"
                description={endereco}
                left={props => <List.Icon {...props} icon="map-marker" color={theme} />}
            />
            <S.StatusContainer theme={'#CCE0FF'}>
                <Text style={{ color: theme, fontSize: 18, fontWeight: 'bold' }}>{coleta?.situacao}</Text>
            </S.StatusContainer>
        </>

    )

}

const SolicitacaoBox: React.FC<SolicitacaoBoxProps> = ({ onPress, coleta }) => {

    return (

        <>
            {(!!onPress && (
                <TouchableOpacity style={[S.styles.Box, elevation.elevation4]} onPress={onPress}>
                    <BoxContent coleta={coleta} />
                </TouchableOpacity>
            )) || (
                    <View style={[S.styles.Box, elevation.elevation4]}>
                        <BoxContent coleta={coleta} />
                    </View>
                )}
        </>

    )

}

export default SolicitacaoBox