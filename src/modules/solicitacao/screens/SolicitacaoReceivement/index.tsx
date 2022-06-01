import React, { useState } from 'react'
import { Alert, View } from 'react-native'
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
import cancel from './scripts/cancel'
import Form from './components/Form'
import SuccessModal from './components/SuccessModal'

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

    const handleNavigate = () => {
        const scannedVolumes = currentSolicitacao!.listaVolumes.filter(f => f.dtLeituraFirstMile !== '')
        if(scannedVolumes.length > 0) scannedVolumes.map(item => item.etiqueta).map(item => dispatch(addScannedSolicitacao(item)))
        navigation.navigate('solicitacaoScan')
    }

    const handleSend = () => {
        send(
            dispatch, 
            !!network, 
            () => navigation.navigate('solicitacaoList'),
            () => setOpenSuccessModal(true),
            userData!.idUsuarioSistema,
            currentSolicitacao!.idLista,
            currentSolicitacao!.idRemetente,
            findLista(lista!, currentSolicitacao!.idRemetente).listaVolumes.filter(f => f.dtLeituraFirstMile !== '').map(item => { return item.idVolume }),
        )
    }

    const handleCancel = () => {
        cancel(
            dispatch, 
            !!network, 
            () => navigation.navigate('solicitacaoList'), 
            userData!.idUsuarioSistema, 
            currentSolicitacao!.idLista, 
            currentSolicitacao!.idRemetente, 
            motivoCancelamento
        )
    }

    const handleStart = () => {
        start(
            dispatch, 
            !!network, 
            handleNavigate, 
            currentSolicitacao!.idLista, 
            currentSolicitacao!.idRemetente,
            {latitude: location![0], longitude: location![1]}
        )
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
                                <Text style = {{marginTop: 20, color: themes.status.success.primary, fontSize: 32, fontWeight: 'bold'}}>{findLista(lista!, currentSolicitacao!.idRemetente).listaVolumes.filter(f => f.dtLeituraFirstMile.length > 1).length}</Text>
                            </S.Box>
                            <View style = {{marginRight: 20}} />
                            <S.Box style = {elevation.elevation2}>
                                <Text style = {{color: '#333333', fontSize: 22}}>Pendentes</Text>
                                <Text style = {{marginTop: 20, color: themes.status.error.primary, fontSize: 32, fontWeight: 'bold'}}>{findLista(lista!, currentSolicitacao!.idRemetente).listaVolumes.filter(f => f.dtLeituraFirstMile === '').length}</Text>
                            </S.Box>
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
                                            { text: 'Cancelar', style: 'cancel' },
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
                                                { text: 'Cancelar', style: 'cancel' },
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
                                            const current = findLista(lista!, currentSolicitacao!.idRemetente)
                                            console.log(current.listaVolumes.some(f => f.dtLeituraFirstMile.length > 1))
                                            if(!current.listaVolumes.some(f => f.dtLeituraFirstMile.length > 1)){
                                                Alert.alert('Atenção', 'Não é possível finalizar o recebimento da lista sem escanear todos os volumes!', [{ text: 'Ok' }])
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