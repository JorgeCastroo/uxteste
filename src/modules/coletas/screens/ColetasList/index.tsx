import React, { useEffect } from 'react'
import themes from '../../../../styles/themes'
import Header from '../../../../components/Screen/Header'
import Render from '../../../../components/Screen/Render'
import Section from '../../../../components/Screen/Section'
import Button from "../../../../components/Button/index"
import ColetasBox from '../../components/ColetasBox'
import ColetasSelect from '../../components/Select'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import acceptColeta from '../../scripts/acceptColeta'
import { useNavigation } from '@react-navigation/native'
import { useIsFocused } from '@react-navigation/native'
import { setloadingColetasAprovadas, setResetColetasAprovadas } from '../../reducers/coletas/coletas'
import { Alert, View } from 'react-native'
import getColetas from '../../scripts/getColetas'
import Loader from './components/Loader'
import loadLista from '../../../solicitacao/scripts/loadLista'
import NoData from '../../../../components/NoData'

const ColetasList: React.FC = () => {

    const dispatch = useAppDispatch()
    const { location } = useAppSelector(s => s.app)
    const { userData } = useAppSelector(s => s.auth)
    const { coletas } = useAppSelector(s => s.coletas)
    const coletasAprovadas = useAppSelector(s => s.coletas.coletasAprovadas)
    const loading = useAppSelector(s => s.coletas.loadingColetasAprovadas)
    const { requestColeta } = useAppSelector(s => s.requestColetas)
    const navigation = useNavigation<any>()
    const isFocused = useIsFocused()

    const SHOW_LOADING = requestColeta.loading
    const SHOW_DATA = !SHOW_LOADING && !!coletas
    const SHOW_COLETAS = SHOW_DATA && coletas.length > 0
    const SHOW_NO_COLETAS = SHOW_DATA && coletas.length === 0

    const handleAceitarColetas = async () => {
        dispatch(setloadingColetasAprovadas(true))

        let response

        for (const coleta of coletasAprovadas) {
            response = await acceptColeta(dispatch, {
                idLista: coleta.idLista,
                idStatusLista: 2,
                latitude: coleta.latitudeDestino,
                longitude: coleta.latitudeDestino
            })
        }

        dispatch(setloadingColetasAprovadas(false))

        if (!!response) {
            if (!response.flagErro){
                loadLista(dispatch, userData!.idUser, { latitude: location![0], longitude: location![1] })
                dispatch(setResetColetasAprovadas())
                navigation.navigate("solicitacaoRoutes")
            }else Alert.alert("Erro ao prosseguir com as coletas!")
        } else {
            console.log('coleta',response)
        }
    }

    useEffect(() => {
        if(isFocused) getColetas(dispatch, userData!.idUser)
    }, [isFocused, dispatch])

    return (

        <>
            <Render
                statusBarOptions={{
                    barStyle: SHOW_LOADING ? 'dark-content' : 'light-content',
                    backgroundColor: SHOW_LOADING ? '#F5F5F5' : themes.colors.primary,
                }}
                align = {SHOW_LOADING ? 'center' : 'flex-start'}
                onRefresh={async () => !SHOW_LOADING && await getColetas(dispatch, userData!.idUser)}
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
                                            key={index}
                                            selected={!!coletasAprovadas.find(f => f.idRemetente === coleta.idRemetente)}
                                            id={coleta.idLista}
                                            cliente={coleta.nomeCliente}
                                            coleta={coleta}
                                            quantidade={coleta.qtdeVolumes}
                                            logradouro={coleta.logradouro}
                                            numero={coleta.numero}
                                            bairro={coleta.bairro}
                                            cidade={coleta.cidade}
                                            uf={coleta.uf}
                                            cep={coleta.cep}
                                        />
                                    ))}
                                </Section>
                            </>
                        )}
                        {SHOW_NO_COLETAS && <NoData emoji = "confused" message = {['Nenhuma coleta encontrada!']} />}
                        {coletasAprovadas.length > 0 && (
                            <View style={{
                                position: 'absolute',
                                bottom: 0,
                                paddingBottom: 30,
                                width: "100%",
                                backgroundColor: "#fff"
                            }}>
                                <Button
                                    label="Prosseguir!"
                                    marginHorizontal={true}
                                    onPress={handleAceitarColetas}
                                    loading={loading}
                                />
                            </View>
                        )}
                    </>
                )}
            </Render>
        </>

    )

}

export default ColetasList