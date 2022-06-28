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
import findLista from '../../scripts/findLista'
import start from './scripts/start'
import cancel from './scripts/cancel'
import send from './scripts/send'
import findListaPosition from '../../scripts/findListaPosition'
import { idStatusLista } from '../../../../constants/idStatusLista'
import Form from './components/Form'
import SuccessModal from './components/SuccessModal'
import StatusBox from './components/StatusBox'
import { getCoords } from '../../../app/scripts/geolocationService'

const SolicitacaoReceivement: React.FC <StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoReceivement'>> = ({ navigation }) => {

    const dispatch = useAppDispatch()
    const { network, location } = useAppSelector(s => s.app)
    const { syncAddLoading } = useAppSelector(s => s.sync)
    const { userData } = useAppSelector(s => s.auth)
    const { currentSolicitacao, lista } = useAppSelector(s => s.lista)
    const { roteirizacao } = useAppSelector(s => s.roteirizacao)
    const { requestStartReceivingLista, requestSaveLista, requestCancelLista } = useAppSelector(s => s.requestLista)

    const [openForm, setOpenForm] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)
    const [motivoCancelamento, setMotivoCancelamento] = useState('')
    
    const SHOW_DATA = !!currentSolicitacao && !!roteirizacao

    const handleNavigate = () => {
        const scannedVolumes = currentSolicitacao!.listaVolumes.filter(f => f.dtLeituraFirstMile !== '')
        if(scannedVolumes.length > 0) scannedVolumes.map(item => item.etiqueta).map(item => dispatch(addScannedSolicitacao(item)))
        navigation.navigate('solicitacaoScan')
    }

    const handleStart = () => {
        start(dispatch, !!network, handleNavigate, currentSolicitacao!.idLista, getCoords(location!))
    }

    const handleCancel = () => {
        cancel(
            dispatch, 
            !!network, 
            () => navigation.navigate('solicitacaoList'), 
            userData!, 
            currentSolicitacao!.idLista, 
            motivoCancelamento
        )
    }

    const handleSend = () => {
        send(
            dispatch, 
            !!network, 
            () => navigation.navigate('solicitacaoList'),
            () => setOpenSuccessModal(true),
            userData!,
            currentSolicitacao!.idLista,
            findLista(lista!, currentSolicitacao!.idLista).listaVolumes
            .filter(f => f.dtLeituraFirstMile !== '')
            .map(item => { return { idVolume: item.idVolume, dtLeitura: item.dtLeituraFirstMile } }),
        )
    }

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} paddingBottom = {40}>
                <Header title = "Lista" />
                {SHOW_DATA && (
                    <>
                        <Section marginTop = {20}>
                            <SolicitacaoBox {...findLista(lista!, currentSolicitacao!.idLista)!} position = {findListaPosition(currentSolicitacao, roteirizacao)} />
                        </Section>
                        <Section type = "row" marginTop = {8} between>
                            <StatusBox
                                theme = {themes.status.success.primary}
                                title = "Recebidos"
                                text = {findLista(lista!, currentSolicitacao!.idLista).listaVolumes.filter(f => f.dtLeituraFirstMile.length > 1).length}
                            />
                            <View style = {{marginRight: 20}} />
                            <StatusBox
                                theme = {themes.status.error.primary}
                                title = "Pendentes"
                                text = {findLista(lista!, currentSolicitacao!.idLista).listaVolumes.filter(f => f.dtLeituraFirstMile === '').length}
                            />
                        </Section>
                        <Section marginTop = {40}>
                            {[2].includes(currentSolicitacao.situacao) && (
                                <Button
                                    label = "Iniciar Recebimento"
                                    marginHorizontal
                                    marginBottom = {8}
                                    loading = {requestStartReceivingLista.loading}
                                    disabled = {requestStartReceivingLista.loading}
                                    onPress = {() => {
                                        Alert.alert('Atenção', 'Deseja iniciar o recebimento da lista?', [
                                            { text: 'Não', style: 'cancel' },
                                            { text: 'Sim', onPress: () => handleStart() }	
                                        ])
                                    }}
                                />
                            )}
                            {[3].includes(currentSolicitacao.situacao) && (
                                <Button
                                    label = "Receber"
                                    marginHorizontal
                                    marginBottom = {8}
                                    onPress = {handleNavigate}
                                />
                            )}
                            {currentSolicitacao.situacao !== idStatusLista['CANCELADO'] && (
                                <>
                                    <Button
                                        label = "Cancelar Recebimento"
                                        color = {[themes.status.error.primary, themes.status.error.secondary]}
                                        marginHorizontal
                                        marginBottom = {8}
                                        loading = {requestCancelLista.loading}
                                        disabled = {requestCancelLista.loading}
                                        onPress = {() => {
                                            Alert.alert('Atenção', 'Deseja cancelar o recebimento da lista?', [
                                                { text: 'Não', style: 'cancel' },
                                                { text: 'Sim', onPress: () => setOpenForm(true) }
                                            ])
                                        }}
                                    />
                                    <Button
                                        label = "Finalizar Recebimento"
                                        color = {[themes.status.success.primary, themes.status.success.secondary]}
                                        marginHorizontal
                                        loading = {requestSaveLista.loading || syncAddLoading}
                                        disabled = {requestSaveLista.loading || syncAddLoading}
                                        onPress = {() => {
                                            const current = findLista(lista!, currentSolicitacao!.idLista)
                                            if(!current.listaVolumes.some(f => f.dtLeituraFirstMile.length > 1)){
                                                Alert.alert('Atenção', 'Não é possível finalizar o recebimento da lista sem escanear todos os volumes!', [
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
                onSubmit = {handleCancel}
            />
            <SuccessModal open = {openSuccessModal} setOpen = {setOpenSuccessModal} redirect = {() => navigation.navigate('solicitacaoList')} />
        </>

    )

}

export default SolicitacaoReceivement