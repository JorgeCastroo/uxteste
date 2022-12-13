
import { VVLOG_ENDPOINT, VVLOG_AUTHORIZATION } from "@env"
import { UserData } from "../../../../../interfaces/UserData"
import * as R from "../../../reducers/authLogin/requestAuthLoginReducer"
import info from "../../../../../utils/info"
import request from "../../../../../utils/request"
import setUserData from "../../../scripts/setUserData"
import { loginFormValues } from "../components/Form/constants"
import storage from "../../../../../utils/storage"


interface TruxDiscovery {
    codigoAcesso: string | null,
    nomeCliente: string,
    urlRouting: string,
    tokenRouting: string,
    urlApiMobile: string,
    urlApiTms: string,
    tokenTms: string,
    versaoCodigoMobile: string,
    idTransportadora: string,
    DistanciaLimite: string,
    S3AcessKey: string,
    S3Bucket: string,
    S3Directory: string,
    S3SecretKey: string,
    FirstMileApiMobile: string,
    FirstMileApiKey:string
}


export default async function send(dispatch: Function, body: typeof loginFormValues) {
    try {
        dispatch(R.setRequestSendAuthLoginLoading())

        const transportadora = await storage.getItem<TruxDiscovery>('transportadora');

        console.log("storage", JSON.stringify(transportadora));

        const endpoint = `${transportadora?.FirstMileApiMobile}Permissao/Login`
        const authorization = transportadora?.FirstMileApiKey
        const response = await request.post<UserData>({ endpoint, authorization, body })

        console.log("endpoint",endpoint);
        console.log("authorization",authorization);
        console.log("response",response);

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