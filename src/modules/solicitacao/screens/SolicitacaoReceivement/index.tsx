import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import * as S from './styles'
import themes from '../../../../styles/themes'
import { elevation } from '../../../../styles/layout'
import Render from '../../../../components/Screen/Render'
import Header from '../../../../components/Screen/Header'
import Section from '../../../../components/Screen/Section'
import SolicitacaoBox from '../../components/SolicitacaoBox'
import Button from '../../../../components/Button'

const SolicitacaoReceivement: React.FC = () => {

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} paddingBottom = {40}>
                <Header title = "Placeholder" goBack = {false} />
                <Section marginTop = {20}>
                    <SolicitacaoBox />
                </Section>
                <Section type = "row" marginTop = {8} between>
                    <S.Box style = {elevation.elevation2}>
                        <Text style = {{color: '#333333', fontSize: 22}}>Recebidos</Text>
                        <Text style = {{marginTop: 20, color: themes.status.success.primary, fontSize: 32, fontWeight: 'bold'}}>50</Text>
                    </S.Box>
                    <View style = {{marginRight: 20}} />
                    <S.Box style = {elevation.elevation2}>
                        <Text style = {{color: '#333333', fontSize: 22}}>Pendentes</Text>
                        <Text style = {{marginTop: 20, color: themes.status.error.primary, fontSize: 32, fontWeight: 'bold'}}>50</Text>
                    </S.Box>
                </Section>
                <Section marginTop = {40} center>
                    <Button
                        color = {['#1967D3', '#074FB1']}
                        label = "Iniciar Recebimento"
                        onPress = {() => {}}
                    />
                </Section>
            </Render>
        </>

    )

}

export default SolicitacaoReceivement