export interface ResponseStatesPattern<T> {
    data: T | null
    loading: boolean
    error: boolean
    message: string
}

export interface ResponsePattern<T> {
    flagErro: boolean
    listaMensagens: string[]
    listaResultados: T
}

export type ResponseDefault<T> = ResponseStatesPattern<ResponsePattern<T>>