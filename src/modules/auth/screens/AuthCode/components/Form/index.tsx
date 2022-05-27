import React from 'react'
import { Formik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks'
import Section from '../../../../../../components/Screen/Section'
import FormLabel from '../../../../../../components/Form/Label'
import FormInput from '../../../../../../components/Form/Input'
import Button from '../../../../../../components/Button'
import FormError from '../../../../../../components/Form/Error'
import { codeFormSchema, codeFormValues } from './constants'

const Form: React.FC = () => {

    const dispatch = useAppDispatch()
    const { requestSendAuthCode } = useAppSelector(s => s.requestAuthCode)

    return(

        <Section padding = {false}>
            <Formik
                initialValues = {codeFormValues}
                validationSchema = {codeFormSchema}
                onSubmit = {v => {}}
            >
                {({ values, errors, handleSubmit, setFieldValue }) => (
                    <>
                        <Section marginBottom = {16}>
                            <FormLabel label = "Informe o código da transportadora" />
                            <FormInput
                                id = "code"
                                error = {!!errors.code}
                                value = {values.code}
                                handleChange = {setFieldValue}
                            />
                        </Section>
                        <FormError
                            visible = {requestSendAuthCode.error}
                            message = {requestSendAuthCode.message}
                        />
                        <Section marginTop = {40}>
                            <Button
                                label = "Confirmar"
                                disabled = {requestSendAuthCode.loading}
                                loading = {requestSendAuthCode.loading}
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