import { DataReducer, ErrorReducer, LoadingReducer, MessageReducer } from "./types"

export default function setRequest(loading: LoadingReducer, data: DataReducer, message: MessageReducer, error: ErrorReducer) {
    return {
        loading,
        data,
        message,
        error
    }
}