import React from 'react'
import { Formik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks'
import Section from '../../../../../../components/Screen/Section'
import { loginFormSchema, loginFormValues } from './constants'
import FormLabel from '../../../../../../components/Form/Label'
import FormInput from '../../../../../../components/Form/Input'
import Button from '../../../../../../components/Button'
import FormError from '../../../../../../components/Form/Error'
import send from '../scripts/send'

const Form: React.FC = () => {

    const dispatch = useAppDispatch()
    const { requestSendAuthLogin } = useAppSelector(s => s.requestSendAuthLogin)

    return(

        <Section padding = {false}>
            <Formik
                initialValues = {loginFormValues}
                validationSchema = {loginFormSchema}
                onSubmit = {v => send(dispatch, v)}
            >
                {({ values, errors, handleSubmit, setFieldValue }) => (
                    <>
                        <Section marginBottom = {16}>
                            <FormLabel label = "Login" />
                            <FormInput
                                id = "login"
                                error = {!!errors.login}
                                value = {values.login}
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
                        <FormError
                            visible = {requestSendAuthLogin.error}
                            message = {requestSendAuthLogin.message}
                        />
                        <Section marginTop = {80}>
                            <Button
                                label = "Entrar"
                                disabled = {requestSendAuthLogin.loading}
                                loading = {requestSendAuthLogin.loading}
                                onPress = {handleSubmit}
                            />
                        </Section>
                    </>
                )}
            </Formik>
        </Section>

    )

}

export default Form