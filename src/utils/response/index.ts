import { ResponseStatesPattern } from "./types"

export const responseInitialValues: ResponseStatesPattern<any> = {
    data: null,
    loading: false,
    error: false,
    message: ''
}