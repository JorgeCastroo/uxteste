import React, { useCallback, useRef, useState } from 'react'
import { StatusBar } from 'react-native'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper'
import FlashMessage from 'react-native-flash-message'
import { useIsFocused } from '@react-navigation/native'
import themes from '../../../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks'
import { addScannedSolicitacao, setModalVisible } from '../../../../reducers/solicitacaoScan/solicitacaoScanReducer'
import { updateEnderecoVolume } from '../../../../reducers/lista/listaReducer'
import FormError from '../../../../../../components/Form/Error'

const Form: React.FC = () => {

    const messageRef = useRef<FlashMessage>(null)
    const isFocused = useIsFocused()

    const dispatch = useAppDispatch()
    const { currentVolumes } = useAppSelector(s => s.lista)
    const { modalVisible, scannedSolicitacoes } = useAppSelector(s => s.solicitacaoScan)
    const [code, setCode] = useState('')

    const onClose = () => {
        setCode('')
        dispatch(setModalVisible(false))
    }

    const handleCode = useCallback((cod: string) => {
        let flashMessage = { message: '', type: '' }
        if(currentVolumes!.map(item => item.etiqueta).includes(cod)){
            if(!scannedSolicitacoes.includes(cod)){
                dispatch(addScannedSolicitacao(cod))
                dispatch(updateEnderecoVolume(cod))
                onClose()
                flashMessage = { message: 'Código lido com sucesso!', type: 'success' }
            }else{
                flashMessage = { message: 'Código já lido!', type: 'danger' }
            }
        }else{
            flashMessage = { message: 'Código não encontrado!', type: 'danger' }
        }
        messageRef.current!.showMessage({
            ...flashMessage as any,
            statusBarHeight: StatusBar.currentHeight
        })
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
                            autoCapitalize = "characters"
                            theme = {{
                                colors: {
                                    primary: themes.colors.tertiary,
                                    background: '#fff',
                                }
                            }}
                            value = {code}
                            onChangeText = {t => setCode(t.toUpperCase())}
                        />
                        <FormError
                            marginTop = {16}
                            visible = {scannedSolicitacoes.includes(code.toUpperCase())}
                            message = "Código já inserido!"
                        />
                    </Dialog.Content>
                    <Dialog.Actions style = {{paddingHorizontal: 20}}>
                        <Button uppercase = {false} color = {themes.status.error.primary} onPress = {onClose}>Fechar</Button>
                        <Button
                            uppercase = {false} 
                            disabled = {code === ''}
                            color = {themes.status.success.primary} 
                            onPress = {() => handleCode(code.toUpperCase())}
                        >Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            )}
            <FlashMessage ref = {messageRef} position = "top" />
        </Portal>

    )

}

export default Form