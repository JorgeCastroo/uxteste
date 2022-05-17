import React from 'react'
import { Appbar, Menu } from 'react-native-paper'

const HeaderMenu: React.FC = () => {

    const [menuVisible, setMenuVisible] = React.useState(false)

    return(

        <Menu
            visible = {menuVisible}
            onDismiss = {() => setMenuVisible(false)}
            anchor = {<Appbar.Action icon = "account" color = "#FFF" onPress = {() => setMenuVisible(true)} />}
        >
            <Menu.Item icon = "account" title = "Placeholder" onPress = {() => {}} />
        </Menu>

    )

}

export default HeaderMenu