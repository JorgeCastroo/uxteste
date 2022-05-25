import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import themes from '../styles/themes'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import AppRoutes from '../modules/app/routes'
import { setAuthLoading } from '../modules/auth/reducers/authReducer'
import AuthRoutes from '../modules/auth/routes'
import getUserData from '../modules/auth/scripts/getUserData'
import localSetLista from '../modules/solicitacao/scripts/local/localSetLista'
import localGetLista from '../modules/solicitacao/scripts/local/localGetLista'
import localGetRoteirizacao from '../modules/roteirizacao/scripts/local/localGetRoteirizacao'

const Routes: React.FC = () => {

    const dispatch = useAppDispatch()
    const { isLogged, authLoading } = useAppSelector(s => s.auth)
    const { lista, oldLista } = useAppSelector(s => s.lista)

    useEffect(() => {
        (async() => {
            await getUserData(dispatch)
            await localGetLista(dispatch)
            await localGetRoteirizacao(dispatch)

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