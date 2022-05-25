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

const SolicitacaoList: React.FC <StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoList'>> = ({ navigation }) => {

    const dispatch = useAppDispatch()
    const { lista, filteredLista } = useAppSelector(s => s.lista)
    const { loadingRoute } = useAppSelector(s => s.solicitacao)

    const SHOW_FILTERED_LISTA = !!filteredLista
    const SHOW_LISTA = !!lista && !SHOW_FILTERED_LISTA

    const handleNavigate = (item: Lista) => {
        dispatch(resetScannedSolicitacoes())
        dispatch(setCurrentSolicitacao(item))
        dispatch(setCurrentVolumes(item.listaVolumes))
        navigation.navigate('solicitacaoReceivement')
    }

    return(

        <>
            <Render 
                statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} 
                paddingBottom = {20} 
                align = {loadingRoute ? 'space-between' : undefined}
            >
                <Header title = "Listas" goBack = {false} />
                {!!lista && (
                    <>
                        <SolicitacaoListSearchbar />
                        <Section>
                            {SHOW_LISTA && lista.map(item => <SolicitacaoBox {...item} key = {item.idLista} onPress = {() => handleNavigate(item)} />)}
                            {SHOW_FILTERED_LISTA && filteredLista.map(item => <SolicitacaoBox {...item} key = {item.idLista} onPress = {() => handleNavigate(item)} />)}
                        </Section>
                    </>
                )}
                {loadingRoute && <Loader />}
                <Section />
            </Render>
        </>

    )

}

export default SolicitacaoList