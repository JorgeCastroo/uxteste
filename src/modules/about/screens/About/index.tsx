import React from 'react'
import { Text } from 'react-native-paper'
import themes from '../../../../styles/themes'
import Render from '../../../../components/Screen/Render'
import Header from '../../../../components/Screen/Header'
import Section from '../../../../components/Screen/Section'
import { APP_VERSION } from '../../../../config'

const About: React.FC = () => {

    return(

        <>
            <Render
                statusBarOptions = {{barStyle: 'light-content', backgroundColor: themes.colors.primary}} 
                paddingBottom = {20} 
            >
                <Header title = "Sobre" />
                <Section marginTop = {20}>
                    <Text style = {{marginBottom: 8, color: '#333', fontSize: 20, fontWeight: 'bold'}}>Versão</Text>    
                    <Text style = {{color: '#333'}}>{APP_VERSION}</Text>
                </Section>
                <Section marginTop = {20}>
                    <Text style = {{marginBottom: 8, color: '#333', fontSize: 20, fontWeight: 'bold'}}>Sobre o app First Mile</Text>
                    <Text style = {{color: '#333'}}>O app UX FIRST MILE coleta dados de local para ativar o recurso de cálculo de distância e rastreamento do motorista pela empresa, mesmo quando o app está fechado ou não está em uso.</Text>
                </Section>
            </Render>
        </>

    )

}

export default About