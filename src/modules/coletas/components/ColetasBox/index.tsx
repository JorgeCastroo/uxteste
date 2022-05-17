import React from 'react'
import { List } from 'react-native-paper'
import * as S from './styles'
import themes from '../../../../styles/themes'
import { elevation } from '../../../../styles/layout'
import Container from '../../../../components/Container'
import ColetaBoxSelect from './Select'

const ColetasBox: React.FC = () => {

    const theme = themes.colors.tertiary

    return(

        <S.Box style = {elevation.elevation4}>
            <List.Item
                title = "Empresa"
                description = "Quantidade 10"
                left = {props => <List.Icon {...props} icon = "office-building" color = {theme} />}
            />
            <List.Item
                title = "Endereço"
                description = "Rua Teste Fulano Placeholder 12345-678 SP"
                left = {props => <List.Icon {...props} icon = "map-marker" color = {theme} />}
            />
            <Container type = "row" padding = {false}>
                <ColetaBoxSelect
                    icon = "close"
                    color = {themes.status.error.primary}
                    onPress = {() => {}}
                />
                <ColetaBoxSelect
                    icon = "check"
                    color = {themes.status.success.primary}
                    onPress = {() => {}}
                />
            </Container>
        </S.Box>

    )

}

export default ColetasBox