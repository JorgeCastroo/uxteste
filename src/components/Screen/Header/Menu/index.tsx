import React from 'react'
import { Appbar, Menu } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { HeaderMenuProps } from './types'
import { useAppDispatch } from '../../../../redux/hooks'
import setUserLogout from '../../../../modules/auth/scripts/setUserLogout'
import loadLista from '../../../../modules/solicitacao/scripts/loadLista'
import closeLista from '../../../../modules/solicitacao/scripts/closeLista'

const HeaderMenu: React.FC <HeaderMenuProps> = ({ screenName }) => {

    const dispatch = useAppDispatch()
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
        </Menu>

    )

}

export default HeaderMenu