import React from 'react'
import { Text } from 'react-native-paper'
import Section from '../../../../components/Screen/Section'
import { APP_VERSION } from '../../../../config'

const AppVersion: React.FC = () => {

    return(

        <Section marginTop = {20} center>
            <Text style = {{color: '#333333', fontWeight: 'bold'}}>{APP_VERSION}</Text>
        </Section>

    )

}

export default AppVersion