import React, { useEffect } from 'react'
import { Appbar, Menu } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useNetInfo } from '@react-native-community/netinfo'
import { HeaderMenuProps } from './types'
import { useAppDispatch } from '../../../../redux/hooks'
import setUserLogout from '../../../../modules/auth/scripts/setUserLogout'
import loadLista from '../../../../modules/solicitacao/scripts/loadLista'
import closeLista from '../../../../modules/solicitacao/scripts/closeLista'
import themes from '../../../../styles/themes'

const HeaderMenu: React.FC <HeaderMenuProps> = ({ screenName }) => {

    const dispatch = useAppDispatch()
    const [menuVisible, setMenuVisible] = React.useState(false)
    const navigation = useNavigation<any>()
    const netInfo = useNetInfo()

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
                        icon = "cloud-download-outline" 
                        title = "Baixar lista" 
                        onPress = {() => handleOnPress(() => loadLista(dispatch))} 
                    />
                    <Menu.Item 
                        icon = "cloud-check-outline" 
                        title = "Encerrar lista" 
                        onPress = {() => handleOnPress(() => closeLista(dispatch))} 
                    />
                </>
            )}
            <Menu.Item 
                icon = "logout" 
                title = "Sair" 
                onPress = {() => handleOnPress(() => setUserLogout(dispatch, () => navigation.navigate('home')))} 
            />
            <Menu.Item
                icon = {netInfo.isInternetReachable ? "cloud-check-outline" : "cloud-off-outline"}
                theme = {{colors: { text: netInfo.isInternetReachable ? themes.status.success.primary : themes.status.error.primary }}}
                title = {netInfo.isInternetReachable ? "Online" : "Offline"}
                titleStyle = {{color: netInfo.isInternetReachable ? themes.status.success.primary : themes.status.error.primary}}
                //disabled = {!netInfo.isInternetReachable}
            />
        </Menu>

    )

}

export default HeaderMenu