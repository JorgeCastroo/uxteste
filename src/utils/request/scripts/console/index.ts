import { RequestMethods } from "../../types"
import { SHOW_RESPONSE_LOG } from "../../../../config"

const line = () => console.log('------------------------------------------------------')

function requestLog(method: RequestMethods, endpoint: string){
    if(SHOW_RESPONSE_LOG.REQUEST){
        line()        
        line()
    }
}

function headerLog(endpoint: string, header: HeadersInit_){
    if(SHOW_RESPONSE_LOG.HEADER){
        line()       
        line()
    }
}

function bodyLog(body: any, endpoint: string){
    if(SHOW_RESPONSE_LOG.BODY){
        line()       
        line()
    }
}

function responseLog(response: any, endpoint: string){
    if(SHOW_RESPONSE_LOG.RESPONSE){
        line()       
        line()
    }
}

function errorLog(method: RequestMethods, endpoint: string, error: any){
    if(SHOW_RESPONSE_LOG.ERROR){      
    }
}

export { requestLog, headerLog, bodyLog, responseLog, errorLog }