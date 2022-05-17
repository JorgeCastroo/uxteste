import React from 'react'
import { Text } from 'react-native-paper'
import themes from '../../../../styles/themes'
import Render from '../../../../components/Screen/Render'
import HomeHeader from '../../components/HomeHeader'
import Section from '../../../../components/Screen/Section'
import TopBox from '../../components/TopBox'
import dayMoment from '../../../../utils/dayMoment'
import GroupInfo from '../../components/Group/Info'
import GroupStatus from '../../components/Group/Status'
import HomeMessage from '../../components/Message'

const Home: React.FC = () => {

    return(

        <>
            <Render statusBarOptions = {{ barStyle: 'light-content', backgroundColor: themes.colors.primary }} paddingBottom = {20}>
                <HomeHeader />
                <TopBox />
                <Section marginTop = {30} marginBottom = {20}>
                    <Text style = {{color: '#333333', fontSize: 18}}>{dayMoment()}</Text>
                    <Text style = {{color: '#333333', fontSize: 24, fontWeight: 'bold'}}>UserName</Text>
                </Section>
                <HomeMessage />
                <GroupInfo />
                <GroupStatus />
            </Render>
        </>

    )

}

export default Home