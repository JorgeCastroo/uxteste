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
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { setloadingColetasAprovadas } from '../../reducers/coletas/coletas';
import { Alert, View } from 'react-native';
import getColetas from '../../scripts/getColetas';

const ColetasList: React.FC = () => {
    const coletas = useAppSelector(s => s.coletas);
    const statusColetas = useAppSelector(s => s.coletas.idStatusColetas);
    const coletasAprovadas = useAppSelector(s => s.coletas.coletasAprovadas)
    const loading = useAppSelector(s => s.coletas.loadingColetasAprovadas)
 
    const navigation = useNavigation<any>()
    const dispatch = useAppDispatch();

    const enviarColetaMocada = async () => {
        acceptColeta(dispatch, {
            idLista: 333025,
            idStatusLista: statusColetas.APROVADO,
            latitude: "",
            longitude: ""
        })
    }

    const handleAceitarColetas = async () => {
        dispatch(setloadingColetasAprovadas(true))

        let response

        for (const coleta of coletasAprovadas) {
            response = await acceptColeta(dispatch, {
                idLista: coleta.idLista,
                idStatusLista: statusColetas.APROVADO,
                latitude: coleta.latitudeDestino,
                longitude: coleta.latitudeDestino
            })
        }

        dispatch(setloadingColetasAprovadas(false))

        if (!!response) {
            console.log(response)
            if (!response.flagErro) navigation.navigate("solicitacaoRoutes")
            else Alert.alert("Erro ao prosseguir com as coletas!")
        } else {
            console.log(response)
        }
    }

    return (
        <>

            <Render
                onRefresh={async () => await getColetas(dispatch)}
                statusBarOptions={{
                    barStyle: 'light-content',
                    backgroundColor: themes.colors.primary,
                }}>
                <Header title="Coletas encontradas" goBack={false} />
                <ColetasSelect />
                {coletas.coletas?.map(coleta => {
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
                    );
                })}
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
                            loading={loading}
                        />
                    </View>
                )}
            </Render>

        </>
    );
};

export default ColetasList;
