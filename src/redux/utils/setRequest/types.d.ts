import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { ResponsePattern } from "../../../utils/response/types"

export type LoadingReducer = ActionCreatorWithoutPayload<string>
export type DataReducer = ActionCreatorWithPayload<ResponsePattern<any>, string>
export type MessageReducer = ActionCreatorWithPayload<string, string>
export type ErrorReducer = ActionCreatorWithoutPayload<string>