import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../../interfaces/SolicitacaoRoutesParams'
import * as S from './styles'
import themes from '../../../../styles/themes'
import { elevation } from '../../../../styles/layout'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { addScannedSolicitacao } from '../../reducers/solicitacaoScan/solicitacaoScanReducer'
import Render from '../../../../components/Screen/Render'
import Header from '../../../../components/Screen/Header'
import Section from '../../../../components/Screen/Section'
import SolicitacaoBox from '../../components/SolicitacaoBox'
import Button from '../../../../components/Button'
import findLista from '../../scripts/findLista'
import send from './scripts/send'
import start from './scripts/start'
import { idStatusLista } from '../../../../constants/idStatusLista'
import findListaPosition from '../../scripts/findListaPosition'

const SolicitacaoReceivement: React.FC <StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoReceivement'>> = ({ navigation }) => {

    const dispatch = useAppDispatch()
    const { network, location } = useAppSelector(s => s.app)
    const { syncAddLoading } = useAppSelector(s => s.sync)
    const { currentSolicitacao, lista, currentPosition } = useAppSelector(s => s.lista)
    const { roteirizacao } = useAppSelector(s => s.roteirizacao)
    const { requestStartReceivingLista } = useAppSelector(s => s.requestLista)

    const handleNavigate = () => {
        const scannedVolumes = currentSolicitacao!.listaVolumes.filter(f => f.dtLeituraFirstMile !== '')
        if(scannedVolumes.length > 0) scannedVolumes.map(item => item.etiqueta).map(item => dispatch(addScannedSolicitacao(item)))
        navigation.navigate('solicitacaoScan')
    }

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} paddingBottom = {40}>
                <Header title = "Lista" />
                {!!currentSolicitacao && !!roteirizacao && (
                    <>
                        <Section marginTop = {20}>
                            <SolicitacaoBox {...currentSolicitacao!} position = {findListaPosition(currentSolicitacao, roteirizacao)} />
                        </Section>
                        <Section type = "row" marginTop = {8} between>
                            <S.Box style = {elevation.elevation2}>
                                <Text style = {{color: '#333333', fontSize: 22}}>Recebidos</Text>
                                <Text style = {{marginTop: 20, color: themes.status.success.primary, fontSize: 32, fontWeight: 'bold'}}>{findLista(lista!, currentSolicitacao!.idLista).listaVolumes.filter(f => f.dtLeituraFirstMile.length > 1).length}</Text>
                            </S.Box>
                            <View style = {{marginRight: 20}} />
                            <S.Box style = {elevation.elevation2}>
                                <Text style = {{color: '#333333', fontSize: 22}}>Pendentes</Text>
                                <Text style = {{marginTop: 20, color: themes.status.error.primary, fontSize: 32, fontWeight: 'bold'}}>{findLista(lista!, currentSolicitacao!.idLista).listaVolumes.filter(f => f.dtLeituraFirstMile === '').length}</Text>
                            </S.Box>
                        </Section>
                        <Section marginTop = {40}>
                            {currentSolicitacao.situacao === idStatusLista['APROVADO'] && (
                                <Button
                                    label = "Iniciar Recebimento"
                                    marginHorizontal
                                    marginBottom = {8}
                                    loading = {requestStartReceivingLista.loading}
                                    disabled = {requestStartReceivingLista.loading}
                                    onPress = {async () => await start(dispatch, !!network, handleNavigate, currentSolicitacao!.idLista, {latitude: location![0], longitude: location![1]})}
                                />
                            )}
                            {currentSolicitacao.situacao === idStatusLista['COLETANDO'] && (
                                <Button
                                    label = "Receber"
                                    marginHorizontal
                                    marginBottom = {8}
                                    onPress = {handleNavigate}
                                />
                            )}
                            <Button
                                label = "Finalizar Recebimento"
                                marginHorizontal
                                loading = {requestStartReceivingLista.loading || syncAddLoading}
                                disabled = {requestStartReceivingLista.loading || syncAddLoading}
                                onPress = {async () => 
                                    await send(
                                        dispatch, 
                                        !!network, 
                                        () => navigation.navigate('solicitacaoList'),
                                        currentSolicitacao!.idLista,
                                        findLista(lista!, currentSolicitacao!.idLista).listaVolumes.filter(f => f.dtLeituraFirstMile !== '').map(item => { return item.idVolume }),
                                    )
                                }
                            />
                        </Section>
                    </>
                )}
            </Render>
        </>

    )

}

export default SolicitacaoReceivement