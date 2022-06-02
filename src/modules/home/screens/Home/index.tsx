import React, { useEffect } from 'react'
import { Text } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'
import themes from '../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import Render from '../../../../components/Screen/Render'
import HomeHeader from '../../components/HomeHeader'
import Section from '../../../../components/Screen/Section'
import TopBox from '../../components/TopBox'
import GroupInfo from '../../components/Group/Info'
import GroupStatus from '../../components/Group/Status'
import HomeMessage from '../../components/Message'
import Container from '../../../../components/Container'
import dayMoment from '../../../../utils/dayMoment'
import getBackgroundGeolocation from '../../../app/scripts/backgroundGeolocation/getBackgroundGeolocation'
import initPushNotification from '../../../app/scripts/pushNotification/initPushNotification'
import AppVersion from '../../../app/components/AppVersion'
import getColetas from '../../../coletas/scripts/getColetas'

const Home: React.FC = () => {

    const dispatch = useAppDispatch()
    const { userData } = useAppSelector(s => s.auth)
    const { lista } = useAppSelector(s => s.lista)
    const { coletas } = useAppSelector(s => s.coletas)
    const { roteirizacao } = useAppSelector(s => s.roteirizacao)
    const { requestColeta } = useAppSelector(s => s.requestColetas)
    const isFocused = useIsFocused()

    const SHOW_COLETAS = !!coletas && coletas.length > 0 && !requestColeta.loading
    const SHOW_DATA = !!lista && !!roteirizacao

    useEffect(() => {
        if(userData){
            initPushNotification(userData.idUsuarioSistema)
            getBackgroundGeolocation(dispatch)
        }
    }, [dispatch, userData])

    useEffect(() => {
        if(isFocused && userData) getColetas(dispatch, userData!.idUsuarioSistema)
    }, [dispatch, isFocused, userData])

    return(

        <>
            <Render statusBarOptions = {{ barStyle: 'light-content', backgroundColor: themes.colors.primary }} align = "space-between" paddingBottom = {24}>
                <Container padding = {false}>
                    <HomeHeader />
                    <TopBox />
                    <Section marginTop = {30} marginBottom = {20}>
                        <Text style = {{color: '#333333', fontSize: 18}}>{dayMoment()}</Text>
                        <Text style = {{color: '#333333', fontSize: 24, fontWeight: 'bold'}}>{userData?.nomeUsuario ?? 'Usuário'}</Text>
                    </Section>
                    {SHOW_COLETAS && <HomeMessage />}
                    {SHOW_DATA && (
                        <>
                            <GroupInfo />
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