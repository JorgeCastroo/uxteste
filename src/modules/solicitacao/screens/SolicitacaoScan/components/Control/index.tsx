import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ControlProps } from './types'
import * as S from './styles'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks'
import { setModalVisible } from '../../../../reducers/solicitacaoScan/solicitacaoScanReducer'
import findEndereco from '../../../../scripts/findEndereco'
import getScannedVolumes from '../../../../scripts/getScannedVolumes'

const Control: React.FC <ControlProps> = ({ navigation }) => {

    const dispatch = useAppDispatch()
    const { lista, currentSolicitacao } = useAppSelector(s => s.lista)

    const scanned = getScannedVolumes(findEndereco(lista!, currentSolicitacao!))

    return(

        <S.ScanControlsContainer>
            <TouchableOpacity onPress = {() => navigation.goBack()}>
                <MaterialCommunityIcons name = "arrow-left" size = {24} color = "#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => scanned.length > 0 && navigation.navigate('solicitacaoScanList')}>
                <Text style = {{color: '#fff', fontWeight: 'bold'}}>{`(${scanned.length}) códigos escaneados`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => dispatch(setModalVisible(true))}>
                <MaterialCommunityIcons name = "keyboard" size = {24} color = "#fff" />
            </TouchableOpacity>
        </S.ScanControlsContainer>

    )

}

export default Control