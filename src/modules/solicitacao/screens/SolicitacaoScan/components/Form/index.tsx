import React, { useCallback, useRef, useState } from 'react'
import { StatusBar } from 'react-native'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper'
import FlashMessage, { showMessage } from 'react-native-flash-message'
import { useIsFocused } from '@react-navigation/native'
import themes from '../../../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks'
import { addScannedSolicitacao, setModalVisible } from '../../../../reducers/solicitacaoScan/solicitacaoScanReducer'
import { updateVolume } from '../../../../reducers/lista/listaReducer'
import FormError from '../../../../../../components/Form/Error'

const Form: React.FC = () => {

    const messageRef = useRef<FlashMessage>(null)
    const dispatch = useAppDispatch()
    const { currentVolumes } = useAppSelector(s => s.lista)
    const { modalVisible, scannedSolicitacoes } = useAppSelector(s => s.solicitacaoScan)
    const [code, setCode] = useState('')
    const isFocused = useIsFocused()

    const onClose = () => {
        setCode('')
        dispatch(setModalVisible(false))
    }

    const handleCode = useCallback((cod: string) => {
        if(currentVolumes!.map(item => item.etiqueta).includes(cod)){
            if(!scannedSolicitacoes.includes(cod)){
                dispatch(addScannedSolicitacao(cod))
                dispatch(updateVolume(cod))
                onClose()
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
        }else{
            messageRef.current!.showMessage({
                message: 'Código não existe nos volumes!',
                type: 'danger',
                statusBarHeight: StatusBar.currentHeight,
            })
        }
    }, [])

    return(

        <Portal>
            {isFocused && (
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
                            onPress = {() => handleCode(code)}
                        >Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            )}
            <FlashMessage ref = {messageRef} position = "top" />
        </Portal>

    )

}

export default Form