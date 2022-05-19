
import { APP_ENDPOINT } from "@env"
import { UserData } from "../../../../../../interfaces/UserData"
import * as R from "../../../../reducers/authLogin/requestAuthLoginReducer"
import info from "../../../../../../utils/info"
import request from "../../../../../../utils/request"
import { ResponsePattern } from "../../../../../../utils/response/types"
import setUserData from "../../../../scripts/setUserData"
import { loginFormValues } from "../Form/constants"
import MOCK from "../../../../../../mock"

export default async function send(dispatch: Function, values: typeof loginFormValues) {
    try {
        setUserData(dispatch, MOCK.UserData, true) //! RETIRAR EM PROD
        /*dispatch(R.setRequestSendAuthLoginLoading())
        
        const endpoint = `${APP_ENDPOINT}`
        const body = values
        const response = await request.post<ResponsePattern<UserData>>({ endpoint, body })
        
        if(response){
            dispatch(R.setRequestSendAuthLoginData(response))
            if(!response.flagErro) setUserData(dispatch, response.listaResultados, true)
            else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')*/
    } catch (error: any) {
        info.error('send loginIndex',error)
        dispatch(R.setRequestSendAuthLoginMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestSendAuthLoginError())
    }
}