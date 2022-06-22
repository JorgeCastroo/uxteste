import React, { useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../../interfaces/SolicitacaoRoutesParams'
import { Lista } from '../../interfaces/Lista'
import themes from '../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { setCurrentSolicitacao, setCurrentVolumes } from '../../reducers/lista/listaReducer'
import { resetScannedSolicitacoes } from '../../reducers/solicitacaoScan/solicitacaoScanReducer'
import Header from '../../../../components/Screen/Header'
import Render from '../../../../components/Screen/Render'
import Section from '../../../../components/Screen/Section'
import SolicitacaoBox from '../../components/SolicitacaoBox'
import NoData from '../../../../components/NoData'
import SolicitacaoListSearchbar from './components/Searchbar'
import Loader from './components/Loader'
import localGetLista from '../../scripts/local/localGetLista'
import { idStatusLista } from '../../../../constants/idStatusLista'
import { syncValuesLista } from '../../scripts/sync'
import closeLista from '../../scripts/closeLista'
import FormError from '../../../../components/Form/Error'
import orderLista from '../../scripts/orderLista'
import findListaPosition from '../../scripts/findListaPosition'

const SolicitacaoList: React.FC<StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoList'>> = ({ navigation }) => {

    const dispatch = useAppDispatch()
    const { lista, filteredLista, loadingNewLista } = useAppSelector(s => s.lista)
    const { roteirizacao } = useAppSelector(s => s.roteirizacao)
    const { requestGetRoteirizacao } = useAppSelector(s => s.requestRoteirizacao)
    const { requestGetLista } = useAppSelector(s => s.requestLista)
    const [allIsSync, setAllIsSync] = useState(true)

    const SHOW_LOADING = loadingNewLista
    const SHOW_NO_LISTA = !SHOW_LOADING && (!lista || !roteirizacao)
    const SHOW_DATA = !SHOW_LOADING && !!lista && lista.length > 0 && !!roteirizacao

    const SHOW_FILTERED_LISTA_DATA = !SHOW_LOADING && !!filteredLista
    const SHOW_FILTERED_LISTA_NO_DATA = !SHOW_LOADING && !!filteredLista && filteredLista.length === 0

    const SHOW_LISTA_DATA = !SHOW_LOADING && !SHOW_FILTERED_LISTA_DATA && !!lista
    const SHOW_LISTA_NO_DATA = !SHOW_LOADING && !SHOW_FILTERED_LISTA_DATA && !!lista && lista.length === 0

    const loaderPercent = requestGetLista.data && requestGetRoteirizacao.data ? 100 : requestGetLista.data ? 50 : 0

    const handleNavigate = (item: Lista) => {
        dispatch(resetScannedSolicitacoes())
        dispatch(setCurrentSolicitacao(item))
        dispatch(setCurrentVolumes(item.listaVolumes))
        navigation.navigate('solicitacaoReceivement')
    }

    useEffect(() => {
        (async() => {
            if(lista && lista.every(f => f.situacao === idStatusLista['FINALIZADO'] || f.situacao === idStatusLista['CANCELADO'])){
                const syncStatus = await syncValuesLista()
                setAllIsSync(syncStatus)
                if(syncStatus) closeLista(dispatch)
            }
        })()
    }, [lista])

    return (

        <>
            <Render 
                statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} 
                paddingBottom = {20} 
                align = {SHOW_LOADING ? 'space-between' : undefined}
                onRefresh = {async () => await localGetLista(dispatch)}
            >
                <Header title = "Listas" goBack = {false} />
                {SHOW_LOADING && <Loader percent = {loaderPercent} />}
                {SHOW_NO_LISTA && <NoData emoji = "confused" message = {['Você não possui listas!']} />}
                {SHOW_DATA && (
                    <>
                        {lista.some(f => f.situacao !== idStatusLista['FINALIZADO']) && <SolicitacaoListSearchbar />}
                        <Section marginTop = {20}>
                            {SHOW_FILTERED_LISTA_NO_DATA && <NoData emoji = "confused" message = {['Nenhum item encontrado!']} />}
                            {SHOW_FILTERED_LISTA_DATA && orderLista(filteredLista, roteirizacao).map((item, index) => (
                                <SolicitacaoBox 
                                    {...item} 
                                    key = {index} 
                                    position = {findListaPosition(item, roteirizacao)}
                                    onPress = {() => handleNavigate(item)} 
                                />
                            ))} 

                            {SHOW_LISTA_NO_DATA && <NoData emoji = "confused" message = {['Nenhuma lista aberta!']} />}
                            {SHOW_LISTA_DATA && orderLista(lista, roteirizacao).map((item, index) => (
                                <SolicitacaoBox 
                                    {...item} 
                                    key = {index} 
                                    position = {findListaPosition(item, roteirizacao)}
                                    onPress = {() => handleNavigate(item)} 
                                />
                            ))}
                        </Section>
                        <FormError
                            visible = {!allIsSync}
                            marginTop = {20}
                            message = "Ainda faltam dados para sincronizar!"
                        />
                    </>
                )}
                <Section />
            </Render>
        </>

    )

}

export default SolicitacaoList