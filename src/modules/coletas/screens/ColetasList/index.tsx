import React, { useEffect, useState } from 'react'
import themes from '../../../../styles/themes'
import Header from '../../../../components/Screen/Header'
import Render from '../../../../components/Screen/Render'
import Section from '../../../../components/Screen/Section'
import ColetasBox from '../../components/ColetasBox'
import ColetasSelect from '../../components/Select'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import getColetas from '../../scripts/getColetas'
import { Text } from 'react-native'

const ColetasList: React.FC = () => {

    const loading = useAppSelector(s => s.requestColetas.requestColeta.loading)
    const coletas = useAppSelector(s => s.coletas.coletas)

    const dispatch = useAppDispatch()

    useEffect(() => {
        getColetas(dispatch, 450)
    }, [])

    return (

        <>
            {loading ? <Text>Loading...</Text> : (
            <Render statusBarOptions={{ barStyle: 'light-content', backgroundColor: themes.colors.primary }}>
                <Header title="Coletas encontradas" goBack={false} />
                <ColetasSelect />
                {coletas?.map(coleta => {
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
                    )
                })}
            </Render>
            )}
        </>

    )

}

export default ColetasList