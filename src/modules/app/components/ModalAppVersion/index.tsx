import React from 'react'
import { Modal, Portal, Text } from 'react-native-paper'
import * as S from './styles'
import { useAppSelector } from '../../../../redux/hooks'

const ModalAppVersion: React.FC = () => {

    const { appVersion, isVersionDeprected } = useAppSelector(s => s.app)

    const SHOW_DATA = !!appVersion

    return(

        <Portal>
            {SHOW_DATA && (
                <Modal visible = {isVersionDeprected} onDismiss = {() => {}} style = {{margin: 20}}>
                    <S.ModalContainer>
                        <Text>{appVersion.versaoAtual}</Text>
                    </S.ModalContainer>
                </Modal>
            )}
        </Portal>

    )

}

export default ModalAppVersion