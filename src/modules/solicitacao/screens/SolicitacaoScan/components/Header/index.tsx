import React from 'react'
import { Text, View } from 'react-native'
import { RNCamera } from 'react-native-camera'
import * as S from './styles'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks'
import { setScanFlashlight, setScanMode } from '../../../../reducers/solicitacaoScan/solicitacaoScanReducer'
import Button from '../Button'
import Section from '../../../../../../components/Screen/Section'

const Header: React.FC = () => {

    const dispatch = useAppDispatch()
    const { scanMode, scanFlashlight } = useAppSelector(s => s.solicitacaoScan)
    const { dtUltimaAtualizacao } = useAppSelector(s => s.app)
    const scanTypes = RNCamera.Constants.BarCodeType
      
    return(

        <S.Header>
            <Section marginTop = {30} marginBottom = {0}>
                <Text style = {{color: '#ffffff', fontSize: 16, textAlign: 'center'}}>Última atualização: {dtUltimaAtualizacao}</Text>
            </Section>
            <Section type = "row" marginTop = {22} center>
                <Button
                    active = {scanMode === scanTypes.code39}
                    label = "Código de Barras"
                    icon = "barcode"
                    onPress = {() => dispatch(setScanMode(scanTypes.code39))}
                />
                <View style = {{marginRight: 20}}/>
                <Button
                    active = {scanMode === scanTypes.qr}
                    label = "QRCode"
                    icon = "qrcode"
                    onPress = {() => dispatch(setScanMode(scanTypes.qr))}
                />
            </Section>
            <Section type = "row" marginTop = {8} center>
                <Button
                    type = "success"
                    active = {scanFlashlight}
                    label = "Flash"
                    icon = {scanFlashlight ? 'flash' : 'flash-off'}
                    onPress = {() => dispatch(setScanFlashlight(!scanFlashlight))}
                />
            </Section>
        </S.Header>

    )

}

export default Header