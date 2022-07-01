import React, { useEffect, useRef } from 'react'
import { FAB, Text } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
//@ts-ignore
import Geojson from 'react-native-geojson'
import { StackScreenProps } from '@react-navigation/stack'
import { AppRoutesParams } from '../../../app/interfaces/AppRoutesParams'
import * as S from './styles'
import themes from '../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { setRenderMap } from '../../reducers/mapReducer'
import Render from '../../../../components/Screen/Render'
import Header from '../../../../components/Screen/Header'
import MapMarker from '../../../../components/Marker'
import createRoute from '../../scripts/createRoute'
import sleep from '../../../../utils/sleep'
import fitMap from '../../scripts/fitMap'
import getFullAddress from '../../../solicitacao/scripts/getFullAddress'
import getStatus from '../../../solicitacao/scripts/getStatus'
import getAddresses from '../../../solicitacao/scripts/getAddresses'
import { setCurrentSolicitacao, setCurrentVolumes } from '../../../solicitacao/reducers/lista/listaReducer'
import { resetScannedSolicitacoes } from '../../../solicitacao/reducers/solicitacaoScan/solicitacaoScanReducer'
import { elevation } from '../../../../styles/layout'
import MapPopup from '../../components/Popup'

const Map: React.FC <StackScreenProps<AppRoutesParams, 'map'>> = ({ navigation }) => {

    const mapRef = useRef<MapView>(null)
    const dispatch = useAppDispatch()
    const { lista } = useAppSelector(s => s.lista)
    const { renderMap, route } = useAppSelector(s => s.map)
    const { roteirizacao, startCoords, endCoords } = useAppSelector(s => s.roteirizacao)
    const isFocused = useIsFocused()

    const LOAD_DATA = !!lista && !!route && !!roteirizacao && !!startCoords && !!endCoords
    const SHOW_DATA = LOAD_DATA && renderMap 
    console.log("🚀 ~ file: index.tsx ~ line 39 ~ SHOW_DATA", SHOW_DATA)

    useEffect(() => {
        (async() => {
            if(roteirizacao && lista && startCoords && endCoords){
                dispatch(setRenderMap(false))
                createRoute(dispatch, roteirizacao.geometry)
                await sleep(200)
                dispatch(setRenderMap(true))
                fitMap(mapRef.current!, getAddresses(lista), startCoords!, endCoords!)
            }
        })()
    }, [roteirizacao, lista, startCoords, endCoords])

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} paddingBottom = {56}>
                <Header title = "Destinatários" goBack = {false} />
                <MapView
                    ref = {mapRef}
                    provider = {PROVIDER_GOOGLE}
                    style = {{width: '100%', height: '100%'}}
                    loadingEnabled = {false}
                    showsMyLocationButton = {false}
                    showsUserLocation
                    showsCompass
                    rotateEnabled = {false}
                    pitchEnabled = {false}
                    userLocationUpdateInterval = {1000}
                >
                    {SHOW_DATA && (
                        <>
                            <Geojson geojson = {route} strokeColor = {themes.colors.primary} strokeWidth = {3} />

                            <Marker pinColor = {themes.colors.primary} coordinate = {startCoords!}>
                                <MapMarker theme = {{ primary: 'green', secondary: '', tertiary: '#fff' }}>
                                    <MaterialCommunityIcons name = "crosshairs-gps" size = {14} color = 'green' />
                                </MapMarker>
                                <MapPopup text = "Início do trajeto" />
                            </Marker>
                            {/* 
                            <Marker pinColor = {themes.colors.primary} coordinate = {endCoords!}>
                                <MapMarker theme = {{ primary: '#000', secondary: '', tertiary: '#fff' }}>
                                    <MaterialCommunityIcons name = "flag-checkered" size = {18} color = '#000' />
                                </MapMarker>
                                <MapPopup text = "Fim do trajeto" />
                            </Marker>
                            */}

                            {getAddresses(lista).map((item, index) => {
                                const statusLista = getStatus(item.situacao)
                                return(
                                    <Marker
                                        key = {index}
                                        pinColor = {statusLista.theme.primary}
                                        coordinate = {{latitude: Number(item.latitudeDestino), longitude: Number(item.longitudeDestino)}}
                                    >
                                        <MapMarker theme = {statusLista.theme}>
                                            <Text style = {{ color: '#333' }}>{index + 1}</Text>
                                        </MapMarker>
                                        <Callout
                                            style = {[elevation.elevation4, { width: 260 }]}
                                            tooltip = {true}
                                            onPress = {() => {
                                                dispatch(resetScannedSolicitacoes())
                                                dispatch(setCurrentSolicitacao(item))
                                                dispatch(setCurrentVolumes(item.listaVolumes))
                                                navigation.navigate('solicitacaoRoutes', { screen: 'solicitacaoReceivement' } as any)
                                            }}
                                        >
                                            <S.PopupContainer>
                                                <S.PopupHeader theme = {statusLista.theme.primary}>
                                                    <Text style = {{ color: '#fff', fontWeight: 'bold' }}>{statusLista.label.toUpperCase()}</Text>
                                                </S.PopupHeader>
                                                <S.PopupMain>
                                                    <Text>{getFullAddress(item)}</Text>
                                                </S.PopupMain>
                                            </S.PopupContainer>
                                        </Callout>
                                    </Marker>
                                )
                            })}
                        </>
                    )}
                </MapView>
                {SHOW_DATA && isFocused && (
                    <>
                        <FAB
                            icon = "map-marker-multiple"
                            color = {themes.colors.primary}
                            style = {{position: 'absolute', bottom: 20, right: 20, backgroundColor: '#fff'}}
                            onPress = {() => fitMap(mapRef.current!, getAddresses(lista), startCoords!, endCoords!)}
                        />
                    </>
                )}
            </Render>
        </>

    )

}

export default Map