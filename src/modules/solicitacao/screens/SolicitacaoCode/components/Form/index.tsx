import React from 'react'
import { Formik } from 'formik'
import { FormProps } from './types'
import Section from '../../../../../../components/Screen/Section'
import FormInput from '../../../../../../components/Form/Input'
import Button from '../../../../../../components/Button'

const Form: React.FC <FormProps> = ({ redirect }) => {

    return(

        <Section padding = {false}>
            <Formik
                initialValues = {{code: ''}}
                onSubmit = {v => {
                    redirect()
                }}
            >
                {({ values, errors, handleSubmit, setFieldValue }) => (
                    <>
                        <Section>
                            <FormInput
                                id = "code"
                                mode = "flat"
                                error = {!!errors.code}
                                value = {values.code}
                                handleChange = {setFieldValue}
                            />
                        </Section>
                        <Section marginTop = {40} center>
                        <Button label = "Continuar" onPress = {handleSubmit} />
                    </Section>
                    </>
                )}
            </Formik>
        </Section>

    )

}

export default Form