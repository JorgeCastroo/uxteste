import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { SolicitacaoRoutesParams } from '../../interfaces/SolicitacaoRoutesParams'
import themes from '../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import Header from '../../../../components/Screen/Header'
import Render from '../../../../components/Screen/Render'
import Section from '../../../../components/Screen/Section'
import SolicitacaoBox from '../../components/SolicitacaoBox'
import SolicitacaoListSearchbar from './components/Searchbar'
import Loader from './components/Loader'

const SolicitacaoList: React.FC <StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoList'>> = ({ navigation }) => {

    const dispatch = useAppDispatch()
    const { solicitacoes, loadingRoute } = useAppSelector(s => s.solicitacao)

    const handleNavigate = () => {
        navigation.navigate('solicitacaoReceivement')
    }

    return(

        <>
            <Render 
                statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} 
                paddingBottom = {20} 
                align = {loadingRoute ? 'space-between' : undefined}
            >
                <Header title = "Listas" goBack = {false} />
                {!loadingRoute && (
                    <>
                        <SolicitacaoListSearchbar />
                        <Section>
                            <SolicitacaoBox onPress = {handleNavigate} />
                        </Section>
                    </>
                )}
                {loadingRoute && <Loader />}
                <Section />
            </Render>
        </>

    )

}

export default SolicitacaoList