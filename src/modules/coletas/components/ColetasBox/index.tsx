import React, { useEffect, useState } from 'react'
import { List } from 'react-native-paper'
import * as S from './styles'
import themes from '../../../../styles/themes'
import { elevation } from '../../../../styles/layout'
import Container from '../../../../components/Container'
import ColetaBoxSelect from './Select'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { setIdsColetas, setRemoveIdsColetas } from '../../reducers/coletas/coletas'

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
    const idsAprovadas = useAppSelector(s => s.coletas.idsColetasAprovadas)
    const idsReprovadas = useAppSelector(s => s.coletas.idsColetasReprovadas)

    useEffect(() => {
        console.log(idsAprovadas)
        console.log(idsReprovadas)
    }, [])

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
                    onPress={() => { dispatch(setRemoveIdsColetas(id))}}
                />
                <ColetaBoxSelect
                    icon="check"
                    color={themes.status.success.primary}
                    onPress={() => dispatch(setIdsColetas(id)) }
                />
            </Container>
        </S.Box>

    )

}

export default ColetasBox