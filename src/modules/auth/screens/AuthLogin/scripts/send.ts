
import { VVLOG_ENDPOINT, VVLOG_AUTHORIZATION } from "@env"
import { UserData } from "../../../../../interfaces/UserData"
import * as R from "../../../reducers/authLogin/requestAuthLoginReducer"
import info from "../../../../../utils/info"
import request from "../../../../../utils/request"
import setUserData from "../../../scripts/setUserData"
import { loginFormValues } from "../components/Form/constants"

export default async function send(dispatch: Function, body: typeof loginFormValues) {
    try {
        dispatch(R.setRequestSendAuthLoginLoading())

        const endpoint = `${VVLOG_ENDPOINT}/Permissao/Login`
        const authorization = VVLOG_AUTHORIZATION
        const response = await request.post<UserData>({ endpoint, authorization, body })

        console.log(endpoint);
        console.log(body);
        console.log(response);

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