import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'
import { interval } from 'rxjs'
import { useObservable } from 'beautiful-react-hooks'
import themes from '../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import Render from '../../../../components/Screen/Render'
import HomeHeader from '../../components/HomeHeader'
import Section from '../../../../components/Screen/Section'
import TopBox from '../../components/TopBox'
import GroupInfo from '../../components/Group/Info'
import GroupStatus from '../../components/Group/Status'
import HomeMessage from '../../components/Message'
import SkeletonHomeMessage from '../../components/Message/Skeleton'
import Container from '../../../../components/Container'
import { getGeolocation } from '../../../app/scripts/geolocationService'
import initPushNotification from '../../../app/scripts/pushNotification/initPushNotification'
import AppVersion from '../../../app/components/AppVersion'
import getColetas from '../../../coletas/scripts/getColetas'
import dayMoment from '../../../../utils/dayMoment'
import getRemainder from '../../../../utils/getRemainder'
import checkListaUpdate from '../../../solicitacao/scripts/checkListaUpdate'

const requestInterval = interval(1000)

const Home: React.FC = () => {

    const dispatch = useAppDispatch()
    const { userData } = useAppSelector(s => s.auth)
    const { lista } = useAppSelector(s => s.lista)
    const { coletas } = useAppSelector(s => s.coletas)
    //const { roteirizacao } = useAppSelector(s => s.roteirizacao)
    const { requestColeta } = useAppSelector(s => s.requestColetas)
    const isFocused = useIsFocused()

    const [seconds, setSeconds] = useState<any>(0)

    const SHOW_COLETAS_LOADING = requestColeta.loading
    const SHOW_COLETAS_DATA = !SHOW_COLETAS_LOADING && !!coletas && coletas.length > 0
    const SHOW_DATA = !!lista

    useObservable(requestInterval, setSeconds as any)

    useEffect(() => {
        if(userData) initPushNotification(userData.idUsuarioSistema)
    }, [dispatch, userData])

    useEffect(() => {
        if(isFocused && userData) getColetas(dispatch, userData)
    }, [dispatch, userData, isFocused])

    useEffect(() => {
        if(userData){
            if(getRemainder(seconds, 10)) getGeolocation(dispatch)
            if(getRemainder(seconds, 60) && SHOW_DATA) checkListaUpdate(dispatch, userData)
        }
    }, [dispatch, userData, seconds, SHOW_DATA])

    return(

        <>
            <Render
                statusBarOptions = {{ barStyle: 'light-content', backgroundColor: themes.colors.primary }}
                align = "space-between"
                paddingBottom = {24}
                onRefresh = {async () => await getColetas(dispatch, userData!)}
            >
                <Container padding = {false}>
                    <HomeHeader />
                    <TopBox />
                    <Section marginTop = {30} marginBottom = {20}>
                        <Text style = {{color: '#333333', fontSize: 18}}>{dayMoment()}</Text>
                        <Text style = {{color: '#333333', fontSize: 24, fontWeight: 'bold'}}>{userData?.nomeUsuario ?? 'Usuário'}</Text>
                    </Section>
                    <Section marginBottom = {40}>
                        {SHOW_COLETAS_LOADING && <SkeletonHomeMessage />}
                        {SHOW_COLETAS_DATA && <HomeMessage />}
                    </Section>
                    {SHOW_DATA && (
                        <>
                            {/* <GroupInfo /> */}
                            <GroupStatus />
                        </>
                    )}
                </Container>
                <AppVersion />
            </Render>
        </>

    )

}

export default Home