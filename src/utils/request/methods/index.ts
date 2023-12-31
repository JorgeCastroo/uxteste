import { RequestPattern, RequestBody } from "../types"
import { bodyLog, errorLog, headerLog, requestLog, responseLog } from "../scripts/console"
import createRequestHeaders from "../scripts/createRequestHeaders"
import createRequestInput from "../scripts/createRequestInput"
import { REQUEST_TIMEOUT } from "../../../config"

async function requestGet<T>({authorization, endpoint, params}: RequestPattern){
    const input = createRequestInput(endpoint, params)
    try {
        requestLog('GET', input)
        //headerLog(input, createRequestHeaders(headers))

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

        const response = await fetch(input, {
            method: 'GET',
            headers: createRequestHeaders(authorization),
            signal: controller.signal,
        })
        const jsonResponse = await response.json()
        
        clearTimeout(timeoutId)

        responseLog(jsonResponse, input)
        return jsonResponse as T
    } catch (error) {
        errorLog('GET', input, error)
        return null
    }
}

async function requestPost<T>({authorization, endpoint, params, body}: RequestPattern & RequestBody){
    const input = createRequestInput(endpoint, params)
    try {
        requestLog('POST', input)
        //headerLog(input, createRequestHeaders(headers))
        bodyLog(body, input)

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

        const response = await fetch(input, {
            method: 'POST',
            headers: createRequestHeaders(authorization),
            body: JSON.stringify(body),
            signal: controller.signal,
        })

        const jsonResponse = await response.json()

        clearTimeout(timeoutId)

        responseLog(jsonResponse, input)
        return jsonResponse as T
    } catch (error) {
        errorLog('POST', input, error)
        return null
    }
}

async function requestDelete<T>({authorization, endpoint, params, body}: RequestPattern & RequestBody){
    const input = createRequestInput(endpoint, params)
    try {
        requestLog('DELETE', input)
        //headerLog(input, createRequestHeaders(headers))
        bodyLog(body, input)

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

        const response = await fetch(input, {
            method: 'DELETE',
            headers: createRequestHeaders(authorization),
            body: JSON.stringify(body),
            signal: controller.signal,
        })
        const jsonResponse = await response.json()
        
        clearTimeout(timeoutId)

        responseLog(jsonResponse, input)
        return jsonResponse as T
    } catch (error) {
        errorLog('DELETE', input, error)
        return null
    }
}

async function requestPut<T>({authorization, endpoint, params, body}: RequestPattern & RequestBody){
    const input = createRequestInput(endpoint, params)
    try {
        requestLog('PUT', input)
        //headerLog(input, createRequestHeaders(headers))
        bodyLog(body, input)

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

        const response = await fetch(input, {
            method: 'PUT',
            headers: createRequestHeaders(authorization),
            body: JSON.stringify(body),
            signal: controller.signal,
        })
        const jsonResponse = await response.json()
        
        clearTimeout(timeoutId)

        responseLog(jsonResponse, input)
        return jsonResponse as T
    } catch (error) {
        errorLog('PUT', input, error)
        return null
    }
}

export { requestGet, requestPost, requestDelete, requestPut }