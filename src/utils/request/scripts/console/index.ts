import { RequestMethods } from "../../types"
import { SHOW_LOG } from "../../../../config"

const line = () => console.log('------------------------------------------------------')

function requestLog(method: RequestMethods, endpoint: string){
    if(SHOW_LOG.REQUEST){
        line()
        console.log(`REQUEST: ${method} ${endpoint}`)
        line()
    }
}

function headerLog(method: RequestMethods, endpoint: string, header: HeadersInit_){
    if(SHOW_LOG.HEADER){
        line()
        console.log(`HEADER: ${method} ${endpoint}`)
        console.log(header)
        line()
    }
}

function bodyLog(body: any, endpoint: string){
    if(SHOW_LOG.BODY){
        line()
        console.log('INIT:',endpoint)
        console.log('BODY:',body)
        line()
    }
}

function responseLog(response: any, endpoint: string){
    if(SHOW_LOG.RESPONSE){
        line()
        console.log('INIT:',endpoint)
        console.log('RESPONSE:',response)
        line()
    }
}

function errorLog(method: RequestMethods, endpoint: string, error: any){
    console.log(`ERROR: ${method} ${endpoint}`)
    console.log('ERROR:',error)
}

export { requestLog, headerLog, bodyLog, responseLog, errorLog }