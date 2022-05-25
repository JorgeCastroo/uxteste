import { RoutesNames } from "../../../interfaces/RoutesNames"

export interface ScreenHeaderProps {
    goBack?: boolean
    backRoute?: string
    title?: string
    subtitle?: string
    screenName?: RoutesNames
}