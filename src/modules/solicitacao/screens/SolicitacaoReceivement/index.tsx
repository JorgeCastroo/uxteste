import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../../interfaces/SolicitacaoRoutesParams'
import themes from '../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { setScannedSolicitacoes } from '../../reducers/solicitacaoScan/solicitacaoScanReducer'
import { updateEnderecoSituacao, updateListaSituacao } from '../../reducers/lista/listaReducer'
import Render from '../../../../components/Screen/Render'
import Header from '../../../../components/Screen/Header'
import Button from '../../../../components/Button'
import Section from '../../../../components/Screen/Section'
import SolicitacaoBox from '../../components/SolicitacaoBox'
import startEndereco from './scripts/startEndereco'
import start from './scripts/start'
import send from './scripts/send'
import findListaPosition from '../../scripts/findListaPosition'
import { idStatusLista } from '../../../../constants/idStatusLista'
import StatusBox from './components/StatusBox'
import SuccessModal from './components/SuccessModal'
import { getCoords } from '../../../app/scripts/geolocationService'
import findEndereco from '../../scripts/findEndereco'
import cancelEndereco from './scripts/cancelEndereco'
import getVolumes from '../../scripts/getVolumes'
import findLista from '../../scripts/findLista'
import checkStatus from '../../scripts/checkStatus'
import sleep from '../../../../utils/sleep'

const SolicitacaoReceivement: React.FC <StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoReceivement'>> = ({ navigation }) => {

    const dispatch = useAppDispatch()
    const { network, location } = useAppSelector(s => s.app)
    const { userData } = useAppSelector(s => s.auth)
    const { lista, currentSolicitacao } = useAppSelector(s => s.lista)
    //const { roteirizacao } = useAppSelector(s => s.roteirizacao)
    const { requestStartReceivingLista, requestSaveLista, requestSendLeituraLista, requestCancelEnderecoLista, requestStartReceivingEndereco } = useAppSelector(s => s.requestLista)

    const [openSuccessModal, setOpenSuccessModal] = useState(false)
    
    const SHOW_DATA = !!currentSolicitacao && !!lista

    const redirect = () => navigation.navigate('solicitacaoList')

    const checkSaveLista = () => {
        const { idLista, idRemetente } = currentSolicitacao!
        return checkStatus(findLista(lista!, idLista), idRemetente, ['APROVADO', 'COLETANDO'])
    }

    const handleNavigate = () => {
        const scannedVolumes = currentSolicitacao!.listaVolumes.filter(f => f.dtLeituraFirstMile !== '')
        if(scannedVolumes.length > 0) dispatch(setScannedSolicitacoes(scannedVolumes.map(item => item.etiqueta)))
        navigation.navigate('solicitacaoScan') 
    }

    const handleStart = async () => {
        const { idLista, idRemetente } = currentSolicitacao!

        if(findLista(lista!, idLista).situacao !== idStatusLista['COLETANDO']) await start(dispatch, !!network, idLista, getCoords(location!))
        //await startEndereco(dispatch, !!network, handleNavigate, idLista, idRemetente, getCoords(location!))

        dispatch(updateEnderecoSituacao({status: 'COLETANDO', idLista, idRemetente}))
        handleNavigate()
    }

    const handleCancelEndereco = async () => {
        const { idLista, idRemetente } = currentSolicitacao!
        await cancelEndereco(dispatch, !!network, redirect, userData!, idLista, idRemetente)

        if(!checkSaveLista()){
            await sleep(500)
            dispatch(updateListaSituacao({status: 'FINALIZADO', idLista}))
        }
    }

    const handleSend = async () => {
        const { idLista, idRemetente } = currentSolicitacao! 
        const openModal = () => setOpenSuccessModal(true)

        await send(dispatch, !!network, redirect, openModal, userData!, idLista, idRemetente, getVolumes(lista!, currentSolicitacao!))

        if(!checkSaveLista()){
            await sleep(500)
            dispatch(updateListaSituacao({status: 'FINALIZADO', idLista}))
        }
    }

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} paddingBottom = {24}>
                <Header title = "Lista" screenName = "solicitacaoReceivement" />
                {SHOW_DATA && (
                    <>
                        <Section marginTop = {20}>
                            <SolicitacaoBox
                                {...findEndereco(lista, currentSolicitacao)} 
                                /*position = {findListaPosition(currentSolicitacao, roteirizacao)}*/
                            />
                        </Section>
                        <Section type = "row" marginTop = {8} marginBottom = {40} between>
                            <StatusBox
                                theme = {themes.status.success.primary}
                                title = "Recebidos"
                                text = {findEndereco(lista, currentSolicitacao).listaVolumes.filter(f => f.dtLeituraFirstMile.length > 1).length}
                            />
                            <View style = {{marginRight: 20}} />
                            <StatusBox
                                theme = {themes.status.error.primary}
                                title = "Pendentes"
                                text = {findEndereco(lista, currentSolicitacao).listaVolumes.filter(f => f.dtLeituraFirstMile === '').length}
                            />
                        </Section>
                        <Section>
                            {[2].includes(currentSolicitacao.situacao ?? idStatusLista['APROVADO']) && (
                                <Button
                                    label = "Iniciar Recebimento"
                                    marginHorizontal
                                    marginBottom = {8}
                                    loading = {requestStartReceivingLista.loading}
                                    disabled = {requestStartReceivingLista.loading}
                                    onPress = {() => {
                                        Alert.alert('Atenção', 'Deseja iniciar o recebimento da lista?', [
                                            { text: 'Não', style: 'cancel' },
                                            { text: 'Sim', onPress: handleStart }	
                                        ])
                                    }}
                                />
                            )}
                            {[3].includes(currentSolicitacao.situacao ?? idStatusLista['APROVADO']) && (
                                <Button
                                    label = "Continuar Recebimento"
                                    marginHorizontal
                                    marginBottom = {8}
                                    loading = {requestStartReceivingEndereco.loading}
                                    disabled = {requestStartReceivingEndereco.loading}
                                    onPress = {handleNavigate}
                                />
                            )}
                            {[2, 3].includes(currentSolicitacao.situacao ?? idStatusLista['APROVADO']) && (
                                <Button
                                    label = "Cancelar Recebimento"
                                    color = {[themes.status.error.primary, themes.status.error.secondary]}
                                    marginHorizontal
                                    marginBottom = {8}
                                    loading = {requestCancelEnderecoLista.loading}
                                    disabled = {requestCancelEnderecoLista.loading}
                                    onPress = {() => {
                                        Alert.alert('Atenção', 'Deseja cancelar o recebimento desse endereço?', [
                                            { text: 'Não', style: 'cancel' },
                                            { text: 'Sim', onPress: handleCancelEndereco }
                                        ])
                                    }}
                                />
                            )}
                            {[3].includes(currentSolicitacao.situacao ?? idStatusLista['APROVADO']) && (
                                <Button
                                    label = "Finalizar Recebimento"
                                    color = {[themes.status.success.primary, themes.status.success.secondary]}
                                    marginHorizontal
                                    loading = {requestSaveLista.loading || requestSendLeituraLista.loading}
                                    disabled = {requestSaveLista.loading || requestSendLeituraLista.loading}
                                    onPress = {() => {
                                        if(!findEndereco(lista, currentSolicitacao).listaVolumes.some(f => f.dtLeituraFirstMile.length > 1)){
                                            Alert.alert('Atenção', 'Não é possível finalizar o recebimento sem escanear todos os volumes!', [{ text: 'Ok' }])
                                        }else handleSend()
                                    }}
                                />
                            )}
                        </Section>
                    </>
                )}
            </Render>
            <SuccessModal open = {openSuccessModal} setOpen = {setOpenSuccessModal} redirect = {redirect} />
        </>

    )

}

export default SolicitacaoReceivement