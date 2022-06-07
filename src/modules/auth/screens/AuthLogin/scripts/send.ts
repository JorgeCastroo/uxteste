
import { TRUX_ENDPOINT } from "@env"
import { UserData } from "../../../../../interfaces/UserData"
import * as R from "../../../reducers/authLogin/requestAuthLoginReducer"
import info from "../../../../../utils/info"
import request from "../../../../../utils/request"
import setUserData from "../../../scripts/setUserData"
import { loginFormValues } from "../components/Form/constants"

export default async function send(dispatch: Function, body: typeof loginFormValues) {
    try {
        dispatch(R.setRequestSendAuthLoginLoading())

        const endpoint = `${TRUX_ENDPOINT}/Permissao/Login`
        const authorization = 'basic mc0}fn7)za6#'
        const response = await request.post<UserData>({ endpoint, authorization, body })

        if (response) {
            dispatch(R.setRequestSendAuthLoginData(response))
            if((response as any).flagErro === false && response.idUsuarioSistema) setUserData(dispatch, response, true)
            else throw new Error((response as any).listaMensagens[0])
        } else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('send loginIndex', error)
        dispatch(R.setRequestSendAuthLoginMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestSendAuthLoginError())
    }
}