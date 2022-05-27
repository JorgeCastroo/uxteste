import React from 'react'
import { List } from 'react-native-paper'
import { ColetaBoxProps } from './types'
import * as S from './styles'
import themes, { status } from '../../../../styles/themes'
import { elevation } from '../../../../styles/layout'
import { useAppDispatch } from '../../../../redux/hooks'
import { setColetasAprovadas, setColetasReprovadas } from '../../reducers/coletas/coletas'
import Container from '../../../../components/Container'
import ColetaBoxSelect from './Select'

const ColetasBox: React.FC <ColetaBoxProps> = ({ selected, id, coleta, cliente, quantidade, logradouro, numero, bairro, cidade, uf, cep }) => {

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
                title={cliente}
                description={`Quantidade: ${quantidade}`}
                left={props => <List.Icon {...props} icon="office-building" color={theme} />}
                right={props => <List.Icon {...props} icon={selected ? "radiobox-marked" : "radiobox-blank"} color = {selected ? status.info.primary : '#C4C4C4'} />}
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