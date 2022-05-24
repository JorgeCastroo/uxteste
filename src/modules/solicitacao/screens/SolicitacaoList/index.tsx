import React, { useEffect, useState } from 'react'
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
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Coletas } from '../../../coletas/types/coletas'
import { useIsFocused } from '@react-navigation/native'

const SolicitacaoList: React.FC<StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoList'>> = ({ navigation }) => {

    const dispatch = useAppDispatch()
    const { solicitacoes } = useAppSelector(s => s.solicitacao)
    const lista = useAppSelector(s => s.lista.lista)
    const [coletas, setColetas] = useState<Coletas[]>()
    const isFocused = useIsFocused()

    const [loading, setLoading] = useState<boolean>(true)

    const handleNavigate = () => {
        navigation.navigate('solicitacaoReceivement')
    }

    const getColetas = async () => {
        const coletasAsyncStorage = await AsyncStorage.getItem("coletas")
        const coletasAsyncStorageJSON = coletasAsyncStorage != null ? JSON.parse(coletasAsyncStorage) : []
        setColetas(coletasAsyncStorageJSON)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }

    useEffect(() => {
        setLoading(true)
        if (isFocused) getColetas()
    }, [isFocused])

    return (

        <>
            <Render
                statusBarOptions={{ barStyle: 'light-content', backgroundColor: themes.colors.primary }}
                paddingBottom={20}
                align={loading ? 'space-between' : undefined}
            >
                <Header title="Listas" goBack={false} />
                {!loading && (
                    <>
                        <SolicitacaoListSearchbar />
                        <Section>
                            {coletas?.map((item) => {
                                return <SolicitacaoBox coleta={item} key={item.id} onPress={handleNavigate} />
                            })}
                        </Section>
                    </>
                )}
                {loading && <Loader />}
                <Section />
            </Render>
        </>

    )

}

export default SolicitacaoList