import { StackNavigationProp } from "@react-navigation/stack"
import { SolicitacaoRoutesParams } from "../../../../interfaces/SolicitacaoRoutesParams"

export interface ControlProps {
    navigation: StackNavigationProp<SolicitacaoRoutesParams, "solicitacaoScan", undefined>
}