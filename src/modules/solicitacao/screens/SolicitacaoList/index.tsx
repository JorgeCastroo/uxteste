import React from 'react'
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
import SolicitacaoListSearchbar from './components/Searchbar'
import Loader from './components/Loader'
import localGetLista from '../../scripts/local/localGetLista'
import { idStatusLista } from '../../../../constants/idStatusLista'

const SolicitacaoList: React.FC<StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoList'>> = ({ navigation }) => {

    const dispatch = useAppDispatch()
    const { lista, filteredLista, loadingNewLista } = useAppSelector(s => s.lista)
    const { requestGetRoteirizacao } = useAppSelector(s => s.requestRoteirizacao)
    const { requestGetLista } = useAppSelector(s => s.requestLista)

    const SHOW_LOADING = loadingNewLista
    const SHOW_LISTA = !SHOW_LOADING && !!lista
    const SHOW_FILTERED_LISTA_DATA = !SHOW_LOADING && !!filteredLista
    const SHOW_LISTA_DATA = !SHOW_LOADING && !!lista && !SHOW_FILTERED_LISTA_DATA

    const loaderPercent = requestGetLista.data && requestGetRoteirizacao.data ? 100 : requestGetLista.data ? 50 : 0

    const handleNavigate = (item: Lista) => {
        dispatch(resetScannedSolicitacoes())
        dispatch(setCurrentSolicitacao(item))
        dispatch(setCurrentVolumes(item.listaVolumes))
        navigation.navigate('solicitacaoReceivement')
    }

    return (

        <>
            <Render 
                statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} 
                paddingBottom = {20} 
                align = {SHOW_LOADING ? 'space-between' : undefined}
                onRefresh = {async () => await localGetLista(dispatch)}
            >
                <Header title = "Listas" goBack = {false} screenName = "solicitacaoList" />
                {SHOW_LISTA && (
                    <>
                        <SolicitacaoListSearchbar />
                        <Section>
                            {SHOW_LISTA_DATA && lista.filter(f => f.situacao !== idStatusLista['FINALIZADO']).map((item, index) => (
                                <SolicitacaoBox 
                                    {...item} 
                                    key = {index} 
                                    onPress = {() => handleNavigate(item)} 
                                />
                            ))}
                            {SHOW_FILTERED_LISTA_DATA && filteredLista.map((item, index) => (
                                <SolicitacaoBox 
                                    {...item} 
                                    key = {index} 
                                    onPress = {() => handleNavigate(item)} 
                                />
                            ))}
                        </Section>
                    </>
                )}
                {SHOW_LOADING && <Loader percent = {loaderPercent} />}
                <Section />
            </Render>
        </>

    )

}

export default SolicitacaoList