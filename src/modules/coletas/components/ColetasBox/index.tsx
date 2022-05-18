import React, { useState } from 'react'
import { List } from 'react-native-paper'
import * as S from './styles'
import themes from '../../../../styles/themes'
import { elevation } from '../../../../styles/layout'
import Container from '../../../../components/Container'
import ColetaBoxSelect from './Select'
import acceptColeta from '../../scripts/acceptColeta'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'

interface Props {
    id: number,
    quantidade: number,
    logradouro: string,
    numero: string,
    bairro: string,
    cidade: string,
    uf: string,
    cep: string,
}

const ColetasBox: React.FC<Props> = ({ id, quantidade, logradouro, numero, bairro, cidade, uf, cep }) => {

    const theme = themes.colors.tertiary
    const dispatch = useAppDispatch()

    return (

        <S.Box style={elevation.elevation4}>
            <List.Item
                title="Empresa"
                description={`Quantidade: ${quantidade}`}
                left={props => <List.Icon {...props} icon="office-building" color={theme} />}
            />
            <List.Item
                title="Endereço"
                description={`${logradouro}, ${bairro}, ${numero}, ${cidade}, ${uf}, ${cep}`}
                left={props => <List.Icon {...props} icon="map-marker" color={theme} />}
            />
            <Container type="row" padding={false}>
                <ColetaBoxSelect
                    icon="close"
                    color={themes.status.error.primary}
                    onPress={() => { }}
                />
                <ColetaBoxSelect
                    icon="check"
                    color={themes.status.success.primary}
                    onPress={() => acceptColeta(dispatch, id, 100) }
                />
            </Container>
        </S.Box>

    )

}

export default ColetasBox