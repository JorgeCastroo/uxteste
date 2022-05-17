import React from 'react'
import { Text } from 'react-native-paper'
import { FormLabelProps } from './types'
import Section from '../../Screen/Section'

const FormLabel: React.FC <FormLabelProps> = ({ label }) => {

    return(

        <Section padding = {false}>
            <Text style = {{color: '#787878', fontSize: 16, fontWeight: '700'}}>{label}</Text>
        </Section>

    )

}

export default FormLabel