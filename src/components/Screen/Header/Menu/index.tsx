import React from 'react'
import { Linking } from 'react-native'
import { Appbar, Divider, Menu } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { HeaderMenuProps } from './types'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import setUserLogout from '../../../../modules/auth/scripts/setUserLogout'
import clearAllSyncStacks from '../../../../modules/sync/scripts/clearAllSyncStacks'
import { APP_VERSION } from '../../../../config'

const HeaderMenu: React.FC <HeaderMenuProps> = ({ screenName }) => {

    const dispatch = useAppDispatch()
    const { isVersionDeprected } = useAppSelector(s => s.app)
    const [menuVisible, setMenuVisible] = React.useState(false)
    const navigation = useNavigation<any>()

    const handleOnPress = (onPress: () => void) => {
        onPress()
        setMenuVisible(false)
    }

    return(

        <Menu
            visible = {menuVisible}
            onDismiss = {() => setMenuVisible(false)}
            anchor = {<Appbar.Action icon = "dots-vertical" color = "#FFF" onPress = {() => setMenuVisible(!menuVisible)} />}
        >
            {screenName === 'solicitacaoList' && (
                <>
                    <Menu.Item
                        icon = "sync-off"
                        title = "Limpar Sync"
                        onPress = {() => clearAllSyncStacks()}
                    />
                </>
            )}
            <Menu.Item
                icon = "information-outline"
                title = "Sobre"
                onPress = {() => handleOnPress(() => navigation.navigate('about'))}
            />
            <Menu.Item 
                icon = "logout" 
                title = "Sair" 
                onPress = {() => handleOnPress(() => setUserLogout(dispatch, () => navigation.navigate('home')))} 
            />
            <Divider />
            <Menu.Item
                icon = {isVersionDeprected ? "cellphone-arrow-down" : "cellphone-information"}
                title = {APP_VERSION}
                disabled = {!isVersionDeprected}
                onPress = {() => Linking.openURL("market://details?id=com.uxfirstmile")}
            />
        </Menu>

    )

}

export default HeaderMenu