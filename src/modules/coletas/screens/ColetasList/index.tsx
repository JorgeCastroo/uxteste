import React from 'react'
import themes from '../../../../styles/themes'
import Header from '../../../../components/Screen/Header'
import Render from '../../../../components/Screen/Render'
import Section from '../../../../components/Screen/Section'
import ColetasBox from '../../components/ColetasBox'
import ColetasSelect from '../../components/Select'

const ColetasList: React.FC = () => {

    return(

        <>
            <Render statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}}>
                <Header title = "Coletas encontradas" goBack = {false} />
                <ColetasSelect />
                <Section>
                    <ColetasBox />
                </Section>
            </Render>
        </>

    )

}

export default ColetasList