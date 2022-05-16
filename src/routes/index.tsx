import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { UserData } from '../interfaces/UserData'
import themes from '../styles/themes'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setAuthLoading } from '../modules/auth/reducers/authReducer'
import setUserData from '../modules/auth/scripts/setUserData'
import storage from '../utils/storage'
import AppRoutes from '../modules/app/routes'
import AuthRoutes from '../modules/auth/routes'

const Routes: React.FC = () => {

    const dispatch = useAppDispatch()
    const { isLogged, authLoading } = useAppSelector(s => s.auth)

    useEffect(() => {
        (async() => {
            const localUser = await storage.getItem<UserData>('userData')
            if(!!localUser) await setUserData(dispatch, localUser, true)
            else dispatch(setAuthLoading(false))
        })()
    }, [dispatch])

    return(

        <>
            {authLoading && <ActivityIndicator color = {themes.colors.primary} /> || (isLogged && <AppRoutes /> || <AuthRoutes />)}
        </>

    )

}

export default Routes