import React from 'react'
import { List } from 'react-native-paper'
import themes from '../../../../styles/themes'
import { useAppSelector } from '../../../../redux/hooks'
import Render from '../../../../components/Screen/Render'
import Header from '../../../../components/Screen/Header'
import Section from '../../../../components/Screen/Section'
import getScannedVolumes from '../../scripts/getScannedVolumes'

const SolicitacaoScanList: React.FC = () => {

    const { lista, currentSolicitacao } = useAppSelector(s => s.lista)

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} paddingBottom = {20}>
                <Header title = "Códigos escaneados" />
                <Section marginTop = {20}>
                    {getScannedVolumes(lista!, currentSolicitacao!).map((item, index) => (
                        <List.Item
                            key = {index}
                            title = {item}
                            left = {props => <List.Icon {...props} icon = "barcode" />}
                        />
                    ))}
                </Section>
            </Render>
        </>

    )

}

export default SolicitacaoScanList