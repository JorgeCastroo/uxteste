import * as yup from 'yup'

export const loginFormSchema = yup.object().shape({
    email: yup.string().email().required(),
    senha: yup.string().required(),
})

export const loginFormValues = {
    email: '',
    senha: '',
}