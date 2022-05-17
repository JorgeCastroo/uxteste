import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../../interfaces/SolicitacaoRoutesParams'
import themes from '../../../../styles/themes'
import Header from '../../../../components/Screen/Header'
import Render from '../../../../components/Screen/Render'
import Section from '../../../../components/Screen/Section'
import SolicitacaoBox from '../../components/SolicitacaoBox'
import SolicitacaoListSearchbar from './components/Searchbar'

const SolicitacaoList: React.FC <StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoList'>> = ({ navigation }) => {

    const handleNavigate = () => {
        navigation.navigate('solicitacaoReceivement')
    }

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} paddingBottom = {20}>
                <Header title = "Listas" goBack = {false} />
                <SolicitacaoListSearchbar />
                <Section>
                    <SolicitacaoBox onPress = {handleNavigate} />
                </Section>
            </Render>
        </>

    )

}

export default SolicitacaoList