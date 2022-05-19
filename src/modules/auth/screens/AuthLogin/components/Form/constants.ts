import * as yup from 'yup'

export const loginFormSchema = yup.object().shape({
    login: yup.string().required(),
    senha: yup.string().required(),
})

export const loginFormValues = {
    login: '',
    senha: '',
}