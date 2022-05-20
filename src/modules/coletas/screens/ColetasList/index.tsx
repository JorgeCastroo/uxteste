import React, { useEffect, useState } from 'react';
import themes, { status } from '../../../../styles/themes';
import Header from '../../../../components/Screen/Header';
import Render from '../../../../components/Screen/Render';
import Section from '../../../../components/Screen/Section';
import ColetasBox from '../../components/ColetasBox';
import ColetasSelect from '../../components/Select';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import getColetas from '../../scripts/getColetas';
import { Button, Text } from 'react-native';
import acceptColeta from '../../scripts/acceptColeta';
import { setColetasOffline, setVolumesOffline } from '../../reducers/coletas/coletas';

const ColetasList: React.FC = () => {
    const loading = useAppSelector(s => s.requestColetas.requestColeta.loading);
    const coletas = useAppSelector(s => s.coletas);
    const idsColetasAprovadas = useAppSelector(s => s.coletas.idsColetasAprovadas);
    const idsColetasReprovadas = useAppSelector(s => s.coletas.idsColetasReprovadas)
    const statusColetas = useAppSelector(s => s.coletas.idStatusColetas);

    const dispatch = useAppDispatch();

    useEffect(() => {
        getColetas(dispatch, 450);
    }, []);

    const handleAcceptColeta = () => {
        acceptColeta(dispatch, idsColetasAprovadas, coletas.coletas, {
            idUsuario: 100,
            dados: [
                {
                    idsLista: idsColetasAprovadas,
                    idStatus: statusColetas.APROVADO,
                },
                {
                    idsLista: idsColetasReprovadas,
                    idStatus: statusColetas.REPROVADO,
                },
            ],
        })
    }

    useEffect(() => {

    }, [])

    return (
        <>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
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
                    {idsColetasAprovadas.length <= 0 ? (
                        <></>
                    ) : (
                        <Button
                            title="Aceitar coletas!"
                            onPress={handleAcceptColeta}
                        />
                    )}
                </Render>
            )}
        </>
    );
};

export default ColetasList;
