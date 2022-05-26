import React from 'react'
import { Appbar } from 'react-native-paper'
import { useNetInfo } from '@react-native-community/netinfo'
import { useNavigation } from '@react-navigation/native'
import { ScreenHeaderProps } from './types'
import themes from '../../../styles/themes'
import HeaderMenu from './Menu'

const Header: React.FC <ScreenHeaderProps> = ({ goBack, backRoute, title, subtitle, screenName }) => {

    const netInfo = useNetInfo()
    const navigation = useNavigation<any>()

    const showBack = goBack ?? true

    return(
        
        <Appbar.Header style = {{width: '100%', backgroundColor: themes.colors.primary}}>
            {showBack && (<Appbar.BackAction onPress = {() => backRoute ? navigation.navigate(backRoute) : navigation.goBack()} />)}
            <Appbar.Content title = {title} subtitle = {subtitle} />
            <Appbar.Action icon = {netInfo.isInternetReachable ? "cloud-check-outline" : "cloud-off-outline"} />
            <HeaderMenu screenName = {screenName} />
        </Appbar.Header>

    )

}

export default Header