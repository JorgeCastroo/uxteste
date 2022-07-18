import React, { Fragment } from 'react'
import { Divider, List } from 'react-native-paper'
import { ColetaBoxProps } from './types'
import { Lista } from '../../../solicitacao/interfaces/Lista'
import * as S from './styles'
import themes, { status } from '../../../../styles/themes'
import { elevation } from '../../../../styles/layout'
import { useAppDispatch } from '../../../../redux/hooks'
import { setColetasAprovadas, setColetasReprovadas } from '../../reducers/coletas/coletas'
import Container from '../../../../components/Container'
import getFullAddress from '../../../solicitacao/scripts/getFullAddress'
import copyAddress from '../../../solicitacao/scripts/copyAddress'
import ColetaBoxSelect from './Select'

const ColetasBox: React.FC <ColetaBoxProps & Lista> = ({ selected, ...coleta }) => {

    const dispatch = useAppDispatch()
    const theme = themes.colors.tertiary

    return (

        <S.Box style = {elevation.elevation4}>
            <List.Accordion
                id = {coleta.idLista.toString()}
                theme = {{colors: {primary: themes.colors.tertiary}}}
                title = {coleta.rota}
                titleStyle = {{fontWeight: 'bold'}}
                description = {`Endereços: ${coleta.listaEnderecos.length} | Volumes: ${coleta.qtdeTotalVolumes}`}
                right = {props => 
                    <List.Icon 
                        icon = {selected ? "check-circle" : props.isExpanded ? 'chevron-up' : "chevron-down"} 
                        color = {selected ? status.success.primary : '#C4C4C4'}
                    />
                }
            >
                {coleta.listaEnderecos.map((endereco, index) => (
                    <Fragment key = {index}>
                        <List.Item
                            title = {endereco.nomeCliente}
                            titleNumberOfLines = {2}
                            description = {getFullAddress(endereco)}
                            descriptionNumberOfLines = {4}
                            left = {props => <List.Icon {...props} icon = "map-marker" color = {theme} />}
                            onPress = {() => copyAddress(endereco)}
                        />
                        <List.Item
                            title = "Volumes"
                            description = {endereco.qtdeVolumes}
                            left = {props => <List.Icon {...props} icon = "package-variant" color = {theme} />}
                        />
                        <Divider />
                    </Fragment>
                ))}
            </List.Accordion>
            <Container type = "row" padding = {false}>
                <ColetaBoxSelect
                    icon = "close"
                    label = "Recusar"
                    color = {themes.status.error.primary}
                    onPress = {() => dispatch(setColetasReprovadas(coleta))}
                />
                <ColetaBoxSelect
                    icon = "check"
                    label = "Aceitar"
                    color = {themes.status.success.primary}
                    onPress = {() => dispatch(setColetasAprovadas(coleta))}
                />
            </Container>
        </S.Box>

    )

}

export default ColetasBox