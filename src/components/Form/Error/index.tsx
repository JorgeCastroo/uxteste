import React from 'react'
import { Text } from 'react-native-paper'
import { FormErrorProps } from './types'
import { SectionProps } from '../../Screen/Section/types'
import themes from '../../../styles/themes'
import Section from '../../Screen/Section'

const FormError: React.FC <FormErrorProps & Partial<SectionProps>> = ({ visible, message, ...props }) => {

    const sectionStyles = { ...props }

    return(

        <>
            {visible && (
                <Section {...sectionStyles} type = "row" center>
                    <Text style = {{color: themes.status.error.primary, fontSize: 14, fontWeight: 'bold'}}>{message}</Text>
                </Section>
            )}
        </>

    )

}

export default FormError