import React, { useEffect } from 'react'
import { Text } from 'react-native-paper'
import themes from '../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import Render from '../../../../components/Screen/Render'
import HomeHeader from '../../components/HomeHeader'
import Section from '../../../../components/Screen/Section'
import TopBox from '../../components/TopBox'
import GroupInfo from '../../components/Group/Info'
import GroupStatus from '../../components/Group/Status'
import HomeMessage from '../../components/Message'
import dayMoment from '../../../../utils/dayMoment'
import getBackgroundGeolocation from '../../../app/scripts/backgroundGeolocation/getBackgroundGeolocation'
import AppVersion from '../../../app/components/AppVersion'

const Home: React.FC = () => {

    const dispatch = useAppDispatch()
    const { userData } = useAppSelector(s => s.auth)
    const { lista } = useAppSelector(s => s.lista)
    const { roteirizacao } = useAppSelector(s => s.roteirizacao)

    const userName = userData?.nome ?? 'Usuário'

    useEffect(() => {
        getBackgroundGeolocation(dispatch)
    }, [dispatch])

    return(

        <>
            <Render statusBarOptions = {{ barStyle: 'light-content', backgroundColor: themes.colors.primary }} paddingBottom = {20}>
                <HomeHeader />
                <TopBox />
                <Section marginTop = {30} marginBottom = {20}>
                    <Text style = {{color: '#333333', fontSize: 18}}>{dayMoment()}</Text>
                    <Text style = {{color: '#333333', fontSize: 24, fontWeight: 'bold'}}>{userName}</Text>
                </Section>
                <HomeMessage />
                {!!lista && (
                    <>
                        {!!roteirizacao && <GroupInfo />}
                        <GroupStatus />
                    </>
                )}
                <AppVersion />
            </Render>
        </>

    )

}

export default Home