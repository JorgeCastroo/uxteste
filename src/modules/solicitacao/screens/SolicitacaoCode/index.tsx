import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../../interfaces/SolicitacaoRoutesParams'
import * as S from './styles'
import themes from '../../../../styles/themes'
import { elevation } from '../../../../styles/layout'
import Render from '../../../../components/Screen/Render'
import Header from '../../../../components/Screen/Header'
import Section from '../../../../components/Screen/Section'
import Form from './components/Form'

const SolicitacaoCode: React.FC <StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoCode'>> = ({ navigation }) => {

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} paddingBottom = {20}>
                <Header title = "Placeholder" goBack = {false} />
                <Section marginTop = {20}>
                    <S.Box style = {elevation.elevation4}>
                        <Text style = {{marginBottom: 20, color: '#292929', fontSize: 22}}>Escanear QR Code</Text>
                        <Text style = {{marginBottom: 60, color: '#2929296B', fontSize: 18, textAlign: 'center'}}>Após clicar no botão “Ler QR Code” aponte sua câmera para o código  do que deseja.</Text>
                        <TouchableOpacity 
                            onPress = {() => {
                                navigation.navigate('solicitacaoCamera')
                            }}
                        >
                            <Text style = {{color: '#1966D0', fontSize: 18, fontWeight: 'bold', fontFamily: 'Inter-Regular'}}>LER QR CODE</Text>
                        </TouchableOpacity>
                    </S.Box>
                </Section>
                <Section marginTop = {32} marginBottom = {32} center>
                    <Text style = {{color: '#787878', fontSize: 22}}>ou</Text>
                </Section>
                <Form redirect = {() => navigation.navigate('solicitacaoReceivement')} />
            </Render>
        </>

    )

}

export default SolicitacaoCode