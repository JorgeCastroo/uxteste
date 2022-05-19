import React, { useCallback } from 'react'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper'
import themes from '../../../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks'
import { addScannedSolicitacao, setModalVisible } from '../../../../reducers/solicitacaoCamera/solicitacaoCameraReducer'

const Form: React.FC = () => {

    const dispatch = useAppDispatch()
    const { modalVisible } = useAppSelector(s => s.solicitacaoCamera)
    const [code, setCode] = React.useState('')

    const handleCode = useCallback(() => {
        dispatch(addScannedSolicitacao(code))
        dispatch(setModalVisible(false))
    }, [code])

    return(

        <Portal>
            <Dialog visible = {modalVisible} onDismiss = {() => dispatch(setModalVisible(false))}>
                <Dialog.Title>Digite o código</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        mode = "flat"
                        label = "Código"
                        theme = {{
                            colors: {
                                primary: themes.colors.tertiary
                            }
                        }}
                        value = {code}
                        onChangeText = {setCode}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button uppercase = {false} color = {themes.status.error.primary} onPress = {() => dispatch(setModalVisible(false))}>Fechar</Button>
                    <Button uppercase = {false} color = {themes.status.success.primary} onPress = {handleCode}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>

    )

}

export default Form