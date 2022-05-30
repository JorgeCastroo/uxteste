import React from 'react'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'
import { FormProps } from './types'
import themes from '../../../../../../styles/themes'

const Form: React.FC <FormProps> = ({ open, setOpen, motivo, setMotivo, onSubmit }) => {

    const isFocused = useIsFocused()

    const handleClose = () => {
        setMotivo('')
        setOpen(false)
    }

    const handleSubmit = () => {
        onSubmit()
        handleClose()
    }

    return(

        <Portal>
            {isFocused && (
                <Dialog visible = {open} onDismiss = {handleClose} style = {{borderRadius: 16}}>
                    <Dialog.Title>Informe o Motivo</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            mode = "flat"
                            label = "Motivo do cancelamento"
                            numberOfLines = {3}
                            theme = {{
                                colors: {
                                    primary: themes.colors.primary,
                                    background: '#fff',
                                }
                            }}
                            value = {motivo}
                            onChangeText = {setMotivo}
                        />
                    </Dialog.Content>
                    <Dialog.Actions style = {{paddingHorizontal: 20}}>
                        <Button uppercase = {false} color = {themes.status.error.primary} onPress = {handleClose}>Fechar</Button>
                        <Button
                            uppercase = {false} 
                            disabled = {motivo === ''}
                            color = {themes.status.success.primary} 
                            onPress = {handleSubmit}
                        >Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            )}
        </Portal>

    )

}

export default Form