import React from 'react'
import { Appbar, Menu } from 'react-native-paper'
import { useAppDispatch } from '../../../../redux/hooks'
import setUserLogout from '../../../../modules/auth/scripts/setUserLogout'
import { useNavigation } from '@react-navigation/native'

const HeaderMenu: React.FC = () => {

    const dispatch = useAppDispatch()
    const [menuVisible, setMenuVisible] = React.useState(false)
    const navigation = useNavigation<any>()

    return(

        <Menu
            visible = {menuVisible}
            onDismiss = {() => setMenuVisible(false)}
            anchor = {<Appbar.Action icon = "account" color = "#FFF" onPress = {() => setMenuVisible(true)} />}
        >
            <Menu.Item icon = "logout" title = "Sair" onPress = {() => setUserLogout(dispatch, () => navigation.navigate('home'))} />
        </Menu>

    )

}

export default HeaderMenu