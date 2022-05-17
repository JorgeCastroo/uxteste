import React from 'react'
import { Appbar, Menu } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ScreenHeaderProps } from './types'
import themes from '../../../styles/themes'
import HeaderMenu from './Menu'

const Header: React.FC <ScreenHeaderProps> = ({ goBack, title, subtitle }) => {

    const navigation = useNavigation()
    const showBack = goBack ?? true

    return(

        <Appbar.Header style = {{width: '100%', backgroundColor: themes.colors.primary}}>
            {showBack && <Appbar.BackAction onPress = {() => navigation.goBack()} />}
            <Appbar.Content title = {title} subtitle = {subtitle} />
            <HeaderMenu />
        </Appbar.Header>

    )

}

export default Header