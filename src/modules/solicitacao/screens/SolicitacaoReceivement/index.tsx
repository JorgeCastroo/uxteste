import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../../interfaces/SolicitacaoRoutesParams'
import themes from '../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { addScannedSolicitacao } from '../../reducers/solicitacaoScan/solicitacaoScanReducer'
import Render from '../../../../components/Screen/Render'
import Header from '../../../../components/Screen/Header'
import Section from '../../../../components/Screen/Section'
import SolicitacaoBox from '../../components/SolicitacaoBox'
import Button from '../../../../components/Button'
import start from './scripts/start'
import cancel from './scripts/cancel'
import save from './scripts/save'
import findListaPosition from '../../scripts/findListaPosition'
import { idStatusLista } from '../../../../constants/idStatusLista'
import Form from './components/Form'
import SuccessModal from './components/SuccessModal'
import StatusBox from './components/StatusBox'
import { getCoords } from '../../../app/scripts/geolocationService'
import findEndereco from '../../scripts/findEndereco'
import { updateEnderecoSituacao } from '../../reducers/lista/listaReducer'
import checkStatus from '../../scripts/checkStatus'
import send from './scripts/send'
import sleep from '../../../../utils/sleep'
import cancelEndereco from './scripts/cancelEndereco'

const SolicitacaoReceivement: React.FC <StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoReceivement'>> = ({ navigation }) => {

    const dispatch = useAppDispatch()
    const { network, location } = useAppSelector(s => s.app)
    const { syncAddLoading } = useAppSelector(s => s.sync)
    const { userData } = useAppSelector(s => s.auth)
    const { lista, currentLista, currentSolicitacao } = useAppSelector(s => s.lista)
    //const { roteirizacao } = useAppSelector(s => s.roteirizacao)
    const { requestStartReceivingLista, requestSaveLista, requestCancelLista, requestSendLeituraLista, requestCancelEnderecoLista } = useAppSelector(s => s.requestLista)

    const [openForm, setOpenForm] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)
    const [motivoCancelamento, setMotivoCancelamento] = useState('')
    
    const SHOW_DATA = !!currentSolicitacao && !!lista

    const handleNavigate = () => {
        const scannedVolumes = currentSolicitacao!.listaVolumes.filter(f => f.dtLeituraFirstMile !== '')
        if(scannedVolumes.length > 0) scannedVolumes.map(item => item.etiqueta).map(item => dispatch(addScannedSolicitacao(item)))
        navigation.navigate('solicitacaoScan')
    }

    const handleStart = async () => {
        const { idLista, idRemetente } = currentSolicitacao!
        if(lista!.find(f => f.idLista === idLista)!.situacao !== idStatusLista['COLETANDO']){
            await start(dispatch, !!network, handleNavigate, idLista, getCoords(location!))
        }
        dispatch(updateEnderecoSituacao({status: 'COLETANDO', idLista, idRemetente}))
    }

    const handleCancelAll = () => {
        const { idLista } = currentSolicitacao!
        cancel(dispatch, !!network, () => navigation.navigate('solicitacaoList'), userData!, idLista, motivoCancelamento)
    }

    const handleCancelOne = () => {
        const { idLista, idRemetente } = currentSolicitacao!
        cancelEndereco(dispatch, !!network, () => navigation.navigate('solicitacaoList'), userData!, idLista, idRemetente)
    }

    const handleSend = async () => {
        const { idLista, idRemetente } = currentSolicitacao!
        if(checkStatus(lista!, idLista, idRemetente, 'COLETANDO')){
            await save(
                dispatch, 
                !!network, 
                () => navigation.navigate('solicitacaoList'),
                () => setOpenSuccessModal(true),
                userData!,
                currentSolicitacao!.idLista,
                findEndereco(lista!, currentSolicitacao!).listaVolumes
                .filter(f => f.dtLeituraFirstMile !== '')
                .map(item => { return { idVolume: item.idVolume, dtLeitura: item.dtLeituraFirstMile } }),
            )
        }else{
            await send(
                dispatch, 
                !!network, 
                () => navigation.navigate('solicitacaoList'),
                () => setOpenSuccessModal(true),
                userData!,
                currentSolicitacao!.idLista,
                findEndereco(lista!, currentSolicitacao!).listaVolumes
                .filter(f => f.dtLeituraFirstMile !== '')
                .map(item => { return { idVolume: item.idVolume, dtLeitura: item.dtLeituraFirstMile } }),
            )
            dispatch(updateEnderecoSituacao({status: 'FINALIZADO', idLista, idRemetente}))
        }
    }

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} paddingBottom = {40}>
                <Header title = "Lista" />
                {SHOW_DATA && (
                    <>
                        <Section marginTop = {20}>
                            <SolicitacaoBox
                                {...findEndereco(lista, currentSolicitacao)} 
                                /*position = {findListaPosition(currentSolicitacao, roteirizacao)}*/
                            />
                        </Section>
                        <Section type = "row" marginTop = {8} between>
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
                        <Section marginTop = {40}>
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
                                    onPress = {handleNavigate}
                                />
                            )}
                            {[2, 3].includes(currentSolicitacao.situacao ?? idStatusLista['APROVADO']) && (
                                <>
                                    <Button
                                        label = "Cancelar Lista"
                                        color = {[themes.status.error.primary, themes.status.error.secondary]}
                                        marginHorizontal
                                        marginBottom = {8}
                                        loading = {requestCancelLista.loading}
                                        disabled = {requestCancelLista.loading}
                                        onPress = {() => {
                                            Alert.alert('Atenção', 'Deseja cancelar a lista?', [
                                                { text: 'Não', style: 'cancel' },
                                                { text: 'Sim', onPress: () => setOpenForm(true) }
                                            ])
                                        }}
                                    />
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
                                                { text: 'Sim', onPress: handleCancelOne }
                                            ])
                                        }}
                                    />
                                    <Button
                                        label = "Finalizar Recebimento"
                                        color = {[themes.status.success.primary, themes.status.success.secondary]}
                                        marginHorizontal
                                        loading = {requestSaveLista.loading || requestSendLeituraLista.loading || syncAddLoading}
                                        disabled = {requestSaveLista.loading || requestSendLeituraLista.loading || syncAddLoading}
                                        onPress = {() => {
                                            if(!findEndereco(lista, currentSolicitacao).listaVolumes.some(f => f.dtLeituraFirstMile.length > 1)){
                                                Alert.alert('Atenção', 'Não é possível finalizar o recebimento sem escanear todos os volumes!', [
                                                    { text: 'Ok' }
                                                ])
                                            }else handleSend()
                                        }}
                                    />
                                </>
                            )}
                        </Section>
                    </>
                )}
            </Render>
            <Form 
                open = {openForm} 
                setOpen = {setOpenForm} 
                motivo = {motivoCancelamento} 
                setMotivo = {setMotivoCancelamento} 
                onSubmit = {handleCancelAll}
            />
            <SuccessModal
                open = {openSuccessModal}
                setOpen = {setOpenSuccessModal}
                redirect = {() => navigation.navigate('solicitacaoList')}
            />
        </>

    )

}

export default SolicitacaoReceivement