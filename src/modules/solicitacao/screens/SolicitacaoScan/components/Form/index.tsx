import React, { useCallback, useRef } from 'react'
import { StatusBar } from 'react-native'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper'
import FlashMessage, { showMessage } from 'react-native-flash-message'
import themes from '../../../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks'
import { addScannedSolicitacao, setModalVisible } from '../../../../reducers/solicitacaoScan/solicitacaoScanReducer'
import FormError from '../../../../../../components/Form/Error'

const Form: React.FC = () => {

    const messageRef = useRef<FlashMessage>(null)
    const dispatch = useAppDispatch()
    const { modalVisible, scannedSolicitacoes } = useAppSelector(s => s.solicitacaoScan)
    const [code, setCode] = React.useState('')

    const onClose = () => {
        setCode('')
        dispatch(setModalVisible(false))
    }

    const handleCode = useCallback(() => {
        if(!scannedSolicitacoes.includes(code)){
            dispatch(addScannedSolicitacao(code))
            dispatch(setModalVisible(false))
            showMessage({
                message: 'Código lido com sucesso!',
                type: 'success',
                statusBarHeight: StatusBar.currentHeight,
            })
        }else{
            messageRef.current!.showMessage({
                message: 'Código já inserido!',
                type: 'danger',
                statusBarHeight: StatusBar.currentHeight,
            })
        }
    }, [code])

    return(

        <Portal>
            <Dialog 
                style = {{borderRadius: 16}}
                visible = {modalVisible} 
                onDismiss = {onClose}
            >
                <Dialog.Title>Digite o código</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        mode = "flat"
                        label = "Código"
                        theme = {{
                            colors: {
                                primary: themes.colors.tertiary,
                                background: '#fff',
                            }
                        }}
                        value = {code}
                        onChangeText = {setCode}
                    />
                    <FormError
                        marginTop = {16}
                        visible = {scannedSolicitacoes.includes(code)}
                        message = "Código já inserido!"
                    />
                </Dialog.Content>
                <Dialog.Actions style = {{paddingHorizontal: 20}}>
                    <Button uppercase = {false} color = {themes.status.error.primary} onPress = {onClose}>Fechar</Button>
                    <Button
                        uppercase = {false} 
                        disabled = {code === ''}
                        color = {themes.status.success.primary} 
                        onPress = {handleCode}
                    >Ok</Button>
                </Dialog.Actions>
            </Dialog>
            <FlashMessage ref = {messageRef} position = "top" />
        </Portal>

    )

}

export default Form