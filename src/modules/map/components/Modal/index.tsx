import React from 'react'
import { List, Modal, Portal } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as S from './styles'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { setOpenModal } from '../../reducers/mapReducer'
import getStatus from '../../../solicitacao/scripts/getStatus'
import getFullAddress from '../../../solicitacao/scripts/getFullAddress'

const MapModal: React.FC = () => {

    const dispatch = useAppDispatch()
    const { currentSolicitacao } = useAppSelector(s => s.lista)
    const { openModal } = useAppSelector(s => s.map)

    const listaStatus = getStatus(currentSolicitacao!.situacao)

    return(

        <Portal>
            {!!currentSolicitacao && (
                <Modal style = {{margin: 20}} visible = {openModal} onDismiss = {() => dispatch(setOpenModal(false))}>
                    <S.ModalContainer>
                        <S.ModalHeader theme = {listaStatus.theme.primary}>
                            <Icon name = "truck" size = {32} color = "#ffffff" />
                        </S.ModalHeader>
                        <S.ModalMain>
                            <List.Item
                                title = {currentSolicitacao.nomeCliente}
                                description = {`Quantidade ${currentSolicitacao.listaVolumes.length}`}
                                left = {props => <List.Icon {...props} icon = "office-building" color = {listaStatus.theme.primary} />}
                            />
                            <List.Item
                                title = "Responsável"
                                description = {currentSolicitacao.nomeResponsavel}
                                left = {props => <List.Icon {...props} icon = "truck" color = {listaStatus.theme.primary} />}
                            />
                            <List.Item
                                title = "Endereço"
                                description = {getFullAddress(currentSolicitacao)}
                                left = {props => <List.Icon {...props} icon = "map-marker" color = {listaStatus.theme.primary} />}
                            />
                        </S.ModalMain>
                    </S.ModalContainer>
                </Modal>
            )}
        </Portal>

    )

}

export default MapModal