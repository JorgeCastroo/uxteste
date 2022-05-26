import React from 'react'
import { List } from 'react-native-paper'
import * as S from './styles'
import themes from '../../../../styles/themes'
import { elevation } from '../../../../styles/layout'
import Container from '../../../../components/Container'
import ColetaBoxSelect from './Select'
import { useAppDispatch } from '../../../../redux/hooks'
import { setColetasAprovadas, setColetasReprovadas } from '../../reducers/coletas/coletas'
import { Coletas } from '../../types/coletas'
import { Lista } from '../../../solicitacao/interfaces/Lista'

interface Props {
    id: number,
    coleta: Lista,
    cliente: string,
    quantidade: number,
    logradouro: string,
    numero: string,
    bairro: string,
    cidade: string,
    uf: string,
    cep: string,
}

const ColetasBox: React.FC<Props> = ({ id, coleta, cliente, quantidade, logradouro, numero, bairro, cidade, uf, cep }) => {

    const theme = themes.colors.tertiary
    const dispatch = useAppDispatch()

    const handleColetasAprovadas = () => {
        dispatch(setColetasAprovadas(coleta))
    }

    const handleColetasReprovadas = () => {
        dispatch(setColetasReprovadas(coleta))
    }

    return (

        <S.Box style={elevation.elevation4}>
            <List.Item
                title={`Empresa: ${cliente}`}
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
                    onPress={handleColetasReprovadas}
                />
                <ColetaBoxSelect
                    icon="check"
                    color={themes.status.success.primary}
                    onPress={handleColetasAprovadas}
                />
            </Container>
        </S.Box>

    )

}

export default ColetasBox