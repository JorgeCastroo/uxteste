import * as yup from 'yup'

export const codeFormSchema = yup.object().shape({
    code: yup.string().required(''),
})

export const codeFormValues = {
    code: '',
}