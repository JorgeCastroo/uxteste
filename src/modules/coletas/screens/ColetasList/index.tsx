import React, { useEffect } from 'react';
import themes from '../../../../styles/themes';
import Header from '../../../../components/Screen/Header';
import Render from '../../../../components/Screen/Render';
import Section from '../../../../components/Screen/Section';
import Button from "../../../../components/Button/index"
import ColetasBox from '../../components/ColetasBox';
import ColetasSelect from '../../components/Select';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import acceptColeta from '../../scripts/acceptColeta';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { setLoadingColetasAprovadas } from '../../reducers/coletas/coletas';
import { Alert, View } from 'react-native';
import getColetas from '../../scripts/getColetas';
import { Text } from 'react-native-paper';

const ColetasList: React.FC = () => {
    const coletas = useAppSelector(s => s.coletas);
    const statusColetas = useAppSelector(s => s.coletas.idStatusColetas);
    const coletasAprovadas = useAppSelector(s => s.coletas.coletasAprovadas)
    const loadingColetasAprovadas = useAppSelector(s => s.coletas.loadingColetasAprovadas)

    const isFocused = useIsFocused()
    const navigation = useNavigation<any>()
    const dispatch = useAppDispatch();

    const handleAceitarColetas = async () => {
        dispatch(setLoadingColetasAprovadas(true))

        let response

        for (const coleta of coletasAprovadas) {
            response = await acceptColeta(dispatch, {
                idLista: coleta.idLista,
                idStatusLista: statusColetas.APROVADO,
                latitude: coleta.latitudeDestino,
                longitude: coleta.latitudeDestino
            })
        }

        dispatch(setLoadingColetasAprovadas(false))

        if (!!response) {
            if (!response.flagErro) navigation.navigate("solicitacaoRoutes")
            else Alert.alert("Erro ao prosseguir com as coletas!")
        } else {
            console.log("RESPONSE", response)
        }
    }

    useEffect(() => {
        getColetas(dispatch)
    }, [isFocused])

    return (
        <>
            <Render
                onRefresh={async () => await getColetas(dispatch)}
                statusBarOptions={{
                    barStyle: 'light-content',
                    backgroundColor: themes.colors.primary,
                }}>
                <Header title="Coletas encontradas" goBack={false} />
                {coletas.coletas ?
                    (
                        <>
                            <ColetasSelect />
                            {coletas.coletas.map(coleta => {
                                return (
                                    <Section key={coleta.idLista}>
                                        <ColetasBox
                                            id={coleta.idLista}
                                            cliente={coleta.nomeCliente}
                                            coleta={coleta}
                                            quantidade={coleta.qtdeVolumes}
                                            logradouro={coleta.logradouro}
                                            numero={coleta.numero}
                                            bairro={coleta.bairro}
                                            cidade={coleta.cidade}
                                            uf={coleta.uf}
                                            cep={coleta.cep}
                                        />
                                    </Section>
                                )
                            })}
                        </>
                    )
                    : <Section marginTop={150} center><Text>Nenhuma coleta encontrada...</Text></Section>}
                {coletasAprovadas.length <= 0 ? (
                    <></>
                ) : (
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        paddingBottom: 30,
                        width: "100%",
                        backgroundColor: "#fff"
                    }}>
                        <Button
                            label="Prosseguir!"
                            marginHorizontal={true}
                            onPress={handleAceitarColetas}
                            loading={loadingColetasAprovadas}
                        />
                    </View>
                )}
            </Render>
        </>
    );
};

export default ColetasList;
