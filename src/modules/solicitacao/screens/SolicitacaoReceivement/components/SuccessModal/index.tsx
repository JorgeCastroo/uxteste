import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Modal, Portal, Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from '@react-navigation/native'
import { SuccessModalProps } from './types'
import * as S from './styles'
import Container from '../../../../../../components/Container'

const SuccessModal: React.FC <SuccessModalProps> = ({ open, setOpen, redirect }) => {

    const isFocused = useIsFocused()

    const handleClose = () => {
        setOpen(false)
        redirect()
    }

    return(

        <Portal>
            {isFocused && (
                <Modal style = {{margin: 20}} visible = {open} onDismiss = {() => {}}>
                    <S.ModalContainer>
                        <Container marginTop = {30} center>
                            <S.SuccessIcon>
                                <MaterialCommunityIcons name = 'check' size = {60} color = '#fff' />
                            </S.SuccessIcon>
                        </Container>
                        <Container marginTop = {32} padding = {false} center>
                            <Text style = {{color: '#3C3C3C', fontSize: 18, fontFamily: 'Inter-Regular', textAlign: 'center'}}>RECEBIMENTO CONCLUÍDO COM SUCESSO! 🎉</Text>
                        </Container>
                        <Container marginTop = {84} center>
                            <TouchableOpacity onPress = {handleClose}>
                                <Text style = {{color: '#1967D3', fontWeight: 'bold', fontFamily: 'Inter-Regular'}}>Voltar ao início</Text>
                            </TouchableOpacity>
                        </Container>
                    </S.ModalContainer> 
                </Modal>
            )}
        </Portal>

    )

}

export default SuccessModal