import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../../interfaces/SolicitacaoRoutesParams'
import * as S from './styles'
import themes from '../../../../styles/themes'
import { elevation } from '../../../../styles/layout'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import Render from '../../../../components/Screen/Render'
import Header from '../../../../components/Screen/Header'
import Section from '../../../../components/Screen/Section'
import SolicitacaoBox from '../../components/SolicitacaoBox'
import Button from '../../../../components/Button'

const SolicitacaoReceivement: React.FC <StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoReceivement'>> = ({ navigation }) => {

    const dispatch = useAppDispatch()
    const { currentSolicitacao, lista } = useAppSelector(s => s.lista)

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} paddingBottom = {40}>
                <Header title = "Placeholder" goBack = {false} />
                <Section marginTop = {20}>
                    <SolicitacaoBox {...currentSolicitacao!} />
                </Section>
                <Section type = "row" marginTop = {8} between>
                    <S.Box style = {elevation.elevation2}>
                        <Text style = {{color: '#333333', fontSize: 22}}>Recebidos</Text>
                        <Text style = {{marginTop: 20, color: themes.status.success.primary, fontSize: 32, fontWeight: 'bold'}}>0</Text>
                    </S.Box>
                    <View style = {{marginRight: 20}} />
                    <S.Box style = {elevation.elevation2}>
                        <Text style = {{color: '#333333', fontSize: 22}}>Pendentes</Text>
                        <Text style = {{marginTop: 20, color: themes.status.error.primary, fontSize: 32, fontWeight: 'bold'}}>0</Text>
                    </S.Box>
                </Section>
                <Section marginTop = {40} center>
                    <Button
                        label = "Iniciar Recebimento"
                        onPress = {() => {
                            navigation.navigate('solicitacaoScan')
                        }}
                    />
                </Section>
            </Render>
        </>

    )

}

export default SolicitacaoReceivement