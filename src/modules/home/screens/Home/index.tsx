import React, { useEffect } from 'react'
import { Text } from 'react-native-paper'
import themes from '../../../../styles/themes'
import { useAppSelector } from '../../../../redux/hooks'
import Render from '../../../../components/Screen/Render'
import HomeHeader from '../../components/HomeHeader'
import Section from '../../../../components/Screen/Section'
import TopBox from '../../components/TopBox'
import GroupInfo from '../../components/Group/Info'
import GroupStatus from '../../components/Group/Status'
import HomeMessage from '../../components/Message'
import dayMoment from '../../../../utils/dayMoment'
import { initPushNotification } from '../../../pushNotification'

const Home: React.FC = () => {

    const { userData } = useAppSelector(s => s.auth)
    const { lista } = useAppSelector(s => s.lista)
    const { roteirizacao } = useAppSelector(s => s.roteirizacao)
    const idUser = useAppSelector(s => s.auth.userData!.idUser)

    const userName = userData?.nome ?? 'Usuário'
    
    useEffect(() => {
        initPushNotification(idUser)
    }, [])

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
            </Render>
        </>

    )

}

export default Home