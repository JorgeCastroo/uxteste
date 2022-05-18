import React from 'react'
import { Formik } from 'formik'
import Section from '../../../../../../components/Screen/Section'
import { loginFormSchema, loginFormValues } from './constants'
import FormLabel from '../../../../../../components/Form/Label'
import FormInput from '../../../../../../components/Form/Input'
import Button from '../../../../../../components/Button'

const Form: React.FC = () => {

    return(

        <Section padding = {false}>
            <Formik
                initialValues = {loginFormValues}
                validationSchema = {loginFormSchema}
                onSubmit = {v => {}}
            >
                {({ values, errors, handleSubmit, setFieldValue }) => (
                    <>
                        <Section marginBottom = {16}>
                            <FormLabel label = "Email" />
                            <FormInput
                                id = "email"
                                error = {!!errors.email}
                                value = {values.email}
                                handleChange = {setFieldValue}
                            />
                        </Section>
                        <Section marginBottom = {16}>
                            <FormLabel label = "Senha" />
                            <FormInput
                                id = "senha"
                                secure = {true}
                                error = {!!errors.senha}
                                value = {values.senha}
                                handleChange = {setFieldValue}
                            />
                        </Section>
                        <Section marginTop = {80}>
                            <Button
                                label = "Entrar"
                            />
                        </Section>
                    </>
                )}
            </Formik>
        </Section>

    )

}

export default Form