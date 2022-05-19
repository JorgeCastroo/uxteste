import React from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import * as S from './styles'
import { elevation } from '../../../../styles/layout'
import TabItem from './Item'
import TabCenterItem from './Center'

const Tabbar: React.FC <BottomTabBarProps> = ({ navigation, state }) => {

    const SHOW_TABBAR = state.index !== 3 && state.routes[2].state?.index !== 2

    return(

        <>
            {SHOW_TABBAR && (
                <S.Container style = {elevation.elevation4}>
                    <TabItem icon = 'home' active = {state.index === 0} onPress = {() => navigation.navigate('home')} />
                    <TabCenterItem onPress = {() => navigation.navigate('map')} />
                    <TabItem icon = 'reorder-horizontal' active = {state.index === 2} onPress = {() => navigation.navigate('solicitacaoRoutes')} />
                </S.Container>
            )}
        </>

    )

}

export default Tabbar