import React, { useEffect, useRef, useState } from 'react'
import { FAB, Text } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
//@ts-ignore
import Geojson from 'react-native-geojson'
import { StackScreenProps } from '@react-navigation/stack'
import { AppRoutesParams } from '../../../app/interfaces/AppRoutesParams'
import * as S from './styles'
import themes from '../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { setRenderMap } from '../../reducers/mapReducer'
import { resetScannedSolicitacoes } from '../../../solicitacao/reducers/solicitacaoScan/solicitacaoScanReducer'
import { setCurrentSolicitacao, setCurrentVolumes } from '../../../solicitacao/reducers/lista/listaReducer'
import Render from '../../../../components/Screen/Render'
import Header from '../../../../components/Screen/Header'
import createRoute from '../../scripts/createRoute'
import sleep from '../../../../utils/sleep'
import fitMap from '../../scripts/fitMap'
import getFullAddress from '../../../solicitacao/scripts/getFullAddress'
import getStatus from '../../../solicitacao/scripts/getStatus'

const Map: React.FC <StackScreenProps<AppRoutesParams, 'map'>> = ({ navigation }) => {

    const mapRef = useRef<MapView>(null)
    const dispatch = useAppDispatch()
    const { lista } = useAppSelector(s => s.lista)
    const { renderMap, route } = useAppSelector(s => s.map)
    const { roteirizacao, startCoords, endCoords } = useAppSelector(s => s.roteirizacao)
    const isFocused = useIsFocused()

    const LOAD_DATA = !!lista && !!route && !!roteirizacao && !!startCoords && !!endCoords
    const SHOW_DATA = LOAD_DATA && renderMap 

    useEffect(() => {
        (async() => {
            if(roteirizacao && lista && startCoords && endCoords){
                dispatch(setRenderMap(false))
                createRoute(dispatch, roteirizacao.geometry)
                await sleep(200)
                dispatch(setRenderMap(true))
                fitMap(mapRef.current!, lista, startCoords!, endCoords!)
            }
        })()
    }, [roteirizacao, lista, startCoords, endCoords])

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} paddingBottom = {0}>
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
                            <Marker pinColor = "orange" coordinate = {startCoords!}>
                                <Callout>
                                    <Text>Início</Text>
                                </Callout>
                            </Marker>
                            <Marker pinColor = "orange" coordinate = {endCoords!}>
                                <Callout>
                                    <Text>Fim</Text>
                                </Callout>
                            </Marker>
                            {lista.map((item, index) => (
                                <Marker
                                    key = {index}
                                    pinColor = {getStatus(item.situacao).theme.primary}
                                    coordinate = {{
                                        latitude: Number(item.latitudeDestino),
                                        longitude: Number(item.longitudeDestino),
                                    }}
                                >
                                    <S.MarkerWrapper>
                                        <S.MarkerIndicator color = {getStatus(item.situacao).theme.primary}>
                                            <Text style = {{color: '#fff', transform: [{ rotate: '-45deg' }]}}>{index + 1}</Text>
                                        </S.MarkerIndicator>
                                    </S.MarkerWrapper>
                                </Marker>
                            ))}
                        </>
                    )}
                </MapView>
                {SHOW_DATA && isFocused && (
                    <FAB
                        icon = "map-marker-multiple"
                        color = {themes.colors.primary}
                        style = {{position: 'absolute', bottom: 20, right: 20, backgroundColor: '#fff'}}
                        onPress = {() => fitMap(mapRef.current!, lista, startCoords!, endCoords!)}
                    />
                )}
            </Render>
        </>

    )

}

export default Map