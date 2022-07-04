import { RequestMethods } from "../../types"
import { SHOW_RESPONSE_LOG } from "../../../../config"

const line = () => console.log('------------------------------------------------------')

function requestLog(method: RequestMethods, endpoint: string){
    if(SHOW_RESPONSE_LOG.REQUEST){
        line()
        console.log(`REQUEST: ${method} ${endpoint}`)
        line()
    }
}

function headerLog(endpoint: string, header: HeadersInit_){
    if(SHOW_RESPONSE_LOG.HEADER){
        line()
        console.log('INIT:',endpoint)
        console.log('HEADER:',header)
        line()
    }
}

function bodyLog(body: any, endpoint: string){
    if(SHOW_RESPONSE_LOG.BODY){
        line()
        console.log('INIT:',endpoint)
        console.log('BODY:',body)
        line()
    }
}

function responseLog(response: any, endpoint: string){
    if(SHOW_RESPONSE_LOG.RESPONSE){
        line()
        console.log('INIT:',endpoint)
        console.log('RESPONSE:',response)
        line()
    }
}

function errorLog(method: RequestMethods, endpoint: string, error: any){
    if(SHOW_RESPONSE_LOG.ERROR){
        console.log(`ERROR: ${method} ${endpoint}`)
        console.log('ERROR:',error)
    }
}

export { requestLog, headerLog, bodyLog, responseLog, errorLog }