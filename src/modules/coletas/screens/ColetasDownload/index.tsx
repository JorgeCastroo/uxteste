import React, { useEffect } from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'
import themes from '../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import Render from '../../../../components/Screen/Render'
import Section from '../../../../components/Screen/Section'
import getColetas from '../../scripts/getColetas'
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { setRequestColetasLoading } from '../../reducers/coletas/requestColetasReducer'

const ColetasDownload: React.FC = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(s => s.requestColetas.requestColeta.loading)
    const navigation = useNavigation<any>()
    const isFocused = useIsFocused()

    useEffect(() => {
        getColetas(dispatch, 450);
    }, [isFocused])

    useEffect(() => {
        if (!loading) navigation.navigate("coletasList")
    }, [isFocused, loading])

    return (

        <>
            <Render align="center" wrapperColor="#fff">
                <Section center>
                    <Text style={{ color: '#292929', fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>Estamos baixando novas coletas</Text>
                </Section>
                <Section marginTop={100} marginBottom={100} center>
                    <ActivityIndicator color={themes.colors.primary} size={98} />
                </Section>
                <Section>
                    <Text style={{ color: '#787878', fontSize: 26, textAlign: 'center' }}>Aguarde só um pouco, logo será redirecionado para a próxima tela...</Text>
                </Section>
            </Render>
        </>

    )

}

export default ColetasDownload