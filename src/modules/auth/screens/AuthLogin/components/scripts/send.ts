
import { TRUX_ENDPOINT } from "@env"
import { UserData } from "../../../../../../interfaces/UserData"
import * as R from "../../../../reducers/authLogin/requestAuthLoginReducer"
import info from "../../../../../../utils/info"
import request from "../../../../../../utils/request"
import setUserData from "../../../../scripts/setUserData"
import { loginFormValues } from "../Form/constants"

export default async function send(dispatch: Function, values: typeof loginFormValues) {
    try {
        dispatch(R.setRequestSendAuthLoginLoading())

        const endpoint = `${TRUX_ENDPOINT}/Motoristas/MotoristaLogin`
        const body = values
        const response = await request.post<UserData>({ endpoint, body })

        if (response) {
            dispatch(R.setRequestSendAuthLoginData(response))
            if (!response.idUser) setUserData(dispatch, response, true)
            else throw new Error("Usuário não encontrado")
        } else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('send loginIndex', error)
        dispatch(R.setRequestSendAuthLoginMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestSendAuthLoginError())
    }
}