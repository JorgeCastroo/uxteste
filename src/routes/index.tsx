import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { useNetInfo } from '@react-native-community/netinfo'
import themes from '../styles/themes'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import AppRoutes from '../modules/app/routes'
import { setAppNetwork } from '../modules/app/reducers/appReducer'
import getAppVersion from '../modules/app/scripts/requests/getAppVersion'
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
    const { isLogged, authLoading, userData } = useAppSelector(s => s.auth)
    const { lista, oldLista } = useAppSelector(s => s.lista)
    const netInfo = useNetInfo()

    useEffect(() => {
        (async() => {
            //getAppVersion(dispatch)

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
    
    useEffect(() => {
        if(netInfo.isInternetReachable !== null && !!userData){
            dispatch(setAppNetwork(netInfo.isInternetReachable))
            if(netInfo.isInternetReachable === true) syncAll(dispatch, userData)
        }
    }, [dispatch, netInfo.isInternetReachable, userData])
    
    if(authLoading) return <ActivityIndicator style = {{marginTop: 20}} color = {themes.colors.primary} />
    else return isLogged ? <AppRoutes /> : <AuthRoutes />

}

export default Routes