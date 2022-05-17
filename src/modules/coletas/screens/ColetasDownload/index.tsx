import React from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'
import themes from '../../../../styles/themes'
import Render from '../../../../components/Screen/Render'
import Section from '../../../../components/Screen/Section'

const ColetasDownload: React.FC = () => {

    return(

        <>
            <Render align = "center" wrapperColor = "#fff">
                <Section center>
                    <Text style = {{color: '#292929', fontSize: 32, fontWeight: 'bold', textAlign: 'center'}}>Estamos baixando novas coletas</Text>
                </Section>
                <Section marginTop = {100} marginBottom = {100} center>
                    <ActivityIndicator color = {themes.colors.primary} size = {98} />
                </Section>
                <Section>
                    <Text style = {{color: '#787878', fontSize: 26, textAlign: 'center'}}>Aguarde só um pouco, logo será redirecionado para a próxima tela...</Text>
                </Section>
            </Render>
        </>

    )

}

export default ColetasDownload