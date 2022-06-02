import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Modal, Portal, Text } from 'react-native-paper'
import AutoHeightImage from 'react-native-auto-height-image'
import * as S from './styles'
import themes from '../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { setAppVersionDialog } from '../../reducers/appReducer'
import Section from '../../../../components/Screen/Section'

const ModalAppVersion: React.FC = () => {

    const dispatch = useAppDispatch()
    const { appVersion, isVersionDeprected, openVersionDialog } = useAppSelector(s => s.app)

    const SHOW_DATA = !!appVersion

    return(

        <Portal>
            {SHOW_DATA && (
                <Modal visible = {openVersionDialog} onDismiss = {() => !isVersionDeprected && dispatch(setAppVersionDialog(false))} style = {{margin: 20}}>
                    <S.ModalContainer>
                        <Section center>
                            <Text style = {{color: '#2B2B2B', fontSize: 26, fontWeight: 'bold', textAlign: 'center'}}>{`Atualização do APP${appVersion.flagObrigatorio ?  ' obrigatória' : ''}`}</Text>
                        </Section>
                        <Section marginTop = {40} marginBottom = {40} center>
                            <AutoHeightImage
                                width = {160}
                                source = {require('../../../../assets/images/atualizacao.png')}
                            />
                        </Section>
                        <Section center>
                            {appVersion.flagObrigatorio && (
                                <Text style = {{color: themes.status.error.primary, fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Ops, para continuar atualize o APP agora!</Text>
                            )}
                            {!appVersion.flagObrigatorio && (
                                <TouchableOpacity onPress = {() => dispatch(setAppVersionDialog(false))}>
                                    <Text style = {{color: themes.status.error.primary, fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Ok</Text>
                                </TouchableOpacity>
                            )}
                        </Section>
                    </S.ModalContainer>
                </Modal>
            )}
        </Portal>

    )

}

export default ModalAppVersion