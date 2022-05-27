import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { useNetInfo } from '@react-native-community/netinfo'
import themes from '../styles/themes'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import AppRoutes from '../modules/app/routes'
import { setAppNetwork } from '../modules/app/reducers/appReducer'
import { setAuthLoading } from '../modules/auth/reducers/authReducer'
import AuthRoutes from '../modules/auth/routes'
import getUserData from '../modules/auth/scripts/getUserData'
import localSetLista from '../modules/solicitacao/scripts/local/localSetLista'
import localGetLista from '../modules/solicitacao/scripts/local/localGetLista'
import localGetRoteirizacao from '../modules/roteirizacao/scripts/local/localGetRoteirizacao'
import localGetCoords from '../modules/roteirizacao/scripts/local/localGetCoords'
import syncAll from '../modules/sync/scripts/syncAll'

const Routes: React.FC = () => {

    const dispatch = useAppDispatch()
    const { isLogged, authLoading } = useAppSelector(s => s.auth)
    const { lista, oldLista } = useAppSelector(s => s.lista)
    const netInfo = useNetInfo()

    useEffect(() => {
        if(netInfo.isInternetReachable !== null){
            dispatch(setAppNetwork(netInfo.isInternetReachable))
            if(netInfo.isInternetReachable === true) syncAll(dispatch)
        }
    }, [netInfo.isInternetReachable])

    useEffect(() => {
        (async() => {
            await getUserData(dispatch)
            await localGetLista(dispatch)
            await localGetRoteirizacao(dispatch)
            await localGetCoords(dispatch)

            dispatch(setAuthLoading(false))
        })()
    }, [dispatch])

    useEffect(() => {
        if(!!lista && JSON.stringify(lista) !== JSON.stringify(oldLista ?? [])) localSetLista(dispatch, lista)
    }, [dispatch, lista])

    if(authLoading) return <ActivityIndicator color = {themes.colors.primary} />
    else return isLogged ? <AppRoutes /> : <AuthRoutes />

}

export default Routes