import React, { useEffect, useState } from 'react';
import themes, { status } from '../../../../styles/themes';
import Header from '../../../../components/Screen/Header';
import Render from '../../../../components/Screen/Render';
import Section from '../../../../components/Screen/Section';
import ColetasBox from '../../components/ColetasBox';
import ColetasSelect from '../../components/Select';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import getColetas from '../../scripts/getColetas';
import { Button } from 'react-native';
import acceptColeta from '../../scripts/acceptColeta';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { setLoadingSendColeta } from '../../reducers/coletas/coletas';

const ColetasList: React.FC = () => {
    const coletas = useAppSelector(s => s.coletas);
    const statusColetas = useAppSelector(s => s.coletas.idStatusColetas);
    const coletasAprovadas = useAppSelector(s => s.coletas.coletasAprovadas)
    const coletasReprovadas = useAppSelector(s => s.coletas.coletasReprovadas)
    const isFocused = useIsFocused()

    const navigation = useNavigation<any>()

    const dispatch = useAppDispatch();

    const handleAcceptColeta = async () => {
        dispatch(setLoadingSendColeta(true))
        coletasAprovadas.forEach(async item => {
            await acceptColeta(dispatch, {
                idLista: item.id,
                idStatusLista: statusColetas.APROVADO,
                latitude: item.latitudeDestino,
                longitude: item.latitudeDestino
            })
        });
        dispatch(setLoadingSendColeta(false))
        navigation.navigate("solicitacaoRoutes")
    }

    useEffect(() => {
        console.log("APROVADAS: ", coletasAprovadas.map(item => item.id))
        console.log("REPROVADAS: ", coletasReprovadas.map(item => item.id))
    }, [isFocused, coletasAprovadas, coletasReprovadas])

    return (
        <>

            <Render
                statusBarOptions={{
                    barStyle: 'light-content',
                    backgroundColor: themes.colors.primary,
                }}>
                <Header title="Coletas encontradas" goBack={false} />
                <ColetasSelect />
                {coletas.coletas?.map(coleta => {
                    return (
                        <Section key={coleta.id}>
                            <ColetasBox
                                id={coleta.id}
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
                    <Button
                        title="Prosseguir!"
                        onPress={handleAcceptColeta}
                    />
                )}
            </Render>

        </>
    );
};

export default ColetasList;
