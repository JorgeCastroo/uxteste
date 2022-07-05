import React from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import themes from '../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { setColetas, setLoadingColetasAprovadas, setResetColetasAprovadas } from '../../reducers/coletas/coletas'
import Header from '../../../../components/Screen/Header'
import Render from '../../../../components/Screen/Render'
import Section from '../../../../components/Screen/Section'
import Button from "../../../../components/Button/index"
import ColetasBox from '../../components/ColetasBox'
import ColetasSelect from '../../components/Select'
import NoData from '../../../../components/NoData'
import Loader from './components/Loader'
import acceptColeta from '../../scripts/acceptColeta'
import loadLista from '../../../solicitacao/scripts/loadLista'
import getColetas from '../../scripts/getColetas'
import Container from '../../../../components/Container'
import { getCoords } from '../../../app/scripts/geolocationService'
import { idStatusLista } from '../../../../constants/idStatusLista'

const ColetasList: React.FC = () => {

    const dispatch = useAppDispatch()
    const { location } = useAppSelector(s => s.app)
    const { userData } = useAppSelector(s => s.auth)
    const { coletas, coletasAprovadas, loadingColetasAprovadas } = useAppSelector(s => s.coletas)
    const { lista } = useAppSelector(s => s.lista)
    const { requestColeta } = useAppSelector(s => s.requestColetas)
    const navigation = useNavigation<any>()

    const SHOW_LOADING = requestColeta.loading
    const SHOW_DATA = !SHOW_LOADING && !!coletas
    const SHOW_COLETAS = SHOW_DATA && coletas.length > 0
    const SHOW_NO_COLETAS = SHOW_DATA && coletas.length === 0

    const handleAceitarColetas = async () => {
        dispatch(setLoadingColetasAprovadas(true))

        let responseAprovadas, responseReprovadas
        for (const coleta of coletasAprovadas) {
            responseAprovadas = await acceptColeta(dispatch, {
                idLista: coleta.idLista,
                idStatusLista: idStatusLista['APROVADO'],
                latitude: (location?.coords.latitude ?? 0).toString(),
                longitude: (location?.coords.longitude ?? 0).toString(),
            })
        }

        const coletasNaoAprovadas = coletas!.filter(coleta => !coletasAprovadas.map(c => c.idLista).includes(coleta.idLista))
        if(coletasNaoAprovadas && coletasNaoAprovadas.length > 0){
            for (const coleta of coletasNaoAprovadas) {
                responseReprovadas = await acceptColeta(dispatch, {
                    idLista: coleta.idLista,
                    idStatusLista: idStatusLista['REPROVADO'],
                    latitude: (location?.coords.latitude ?? 0).toString(),
                    longitude: (location?.coords.longitude ?? 0).toString(),
                })
            }
        }

        dispatch(setLoadingColetasAprovadas(false))
        
        if (!!responseAprovadas) {
            if (!responseAprovadas.flagErro){
                loadLista(dispatch, userData!, getCoords(location!), lista)
                dispatch(setResetColetasAprovadas())
                dispatch(setColetas(null))
                navigation.navigate("solicitacaoRoutes")
            } else Alert.alert("Erro ao prosseguir com as coletas!")
        }
    }

    return (

        <>
            <Render
                statusBarOptions={{
                    barStyle: SHOW_LOADING ? 'dark-content' : 'light-content',
                    backgroundColor: SHOW_LOADING ? '#F5F5F5' : themes.colors.primary,
                }}
                align = {SHOW_LOADING ? 'center' : 'flex-start'}
                paddingBottom = {24}
                onRefresh = {async () => !SHOW_LOADING && await getColetas(dispatch, userData!)}
            >
                {SHOW_LOADING && <Loader />}
                {SHOW_DATA && (
                    <>
                        <Header title="Novas coletas" />
                        {SHOW_COLETAS && (
                            <>
                                <ColetasSelect />
                                <Section>
                                    {coletas.map((coleta, index) => (
                                        <ColetasBox
                                            {...coleta}
                                            key = {index}
                                            selected = {!!coletasAprovadas.find(f => f.idLista === coleta.idLista)}
                                        />
                                    ))}
                                </Section>
                            </>
                        )}
                        {SHOW_NO_COLETAS && <NoData emoji = "confused" message = {['Nenhuma coleta encontrada!']} />}
                        {SHOW_DATA && coletasAprovadas.length > 0 && (
                            <Container>
                                <Button
                                    label="Prosseguir"
                                    marginHorizontal={true}
                                    loading={loadingColetasAprovadas}
                                    disabled={loadingColetasAprovadas}
                                    onPress={handleAceitarColetas}
                                />
                            </Container>
                        )}
                    </>
                )}
            </Render>
        </>

    )

}

export default ColetasList