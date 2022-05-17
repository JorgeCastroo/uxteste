import info from "../../../utils/info"
import request from "../../../utils/request"
import { ResponsePattern } from "../../../utils/response/types"

export default async function getColetas(dispatch: Function){
    try {

        const endpoint = `https://first-mile.herokuapp.com/list/350`
        const response = await request.get<ResponsePattern<any>>({ endpoint })

        if(response){
            
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('getColetas',error)
        
    }
}