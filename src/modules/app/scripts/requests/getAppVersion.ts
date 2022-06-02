import { Platform } from 'react-native'
import { AppVersion } from '../../interfaces/AppVersion'
import { ResponsePattern } from '../../../../utils/response/types'
import * as R from '../../reducers/requestAppReducer'
import { setAppVersion } from '../../reducers/appReducer'
import info from '../../../../utils/info'
import request from '../../../../utils/request'

export default async function getAppVersion(dispatch: Function){
    try {
        dispatch(R.setRequestAppVersionLoading())

        const endpoint = `https://mobile.ondetah.com.br/sistema/versao/${Platform.OS}`
        const response = await request.get<ResponsePattern<AppVersion>>({ endpoint })

        if(response){
            dispatch(R.setRequestAppVersionData(response))
            if(!response.flagErro)dispatch(setAppVersion(response.listaResultados))
            else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('getAppVersion',error)
        dispatch(R.setRequestAppVersionMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestAppVersionError())
    }
}