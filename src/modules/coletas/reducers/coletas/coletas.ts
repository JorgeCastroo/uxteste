import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Coletas {
    id:                   number;
    idUsuario:            number;
    nomeCliente:          string;
    nomeResponsavel:      string;
    documentoResponsavel: string;
    qtdeVolumes:          number;
    logradouro:           string;
    numero:               string;
    complemento:          string;
    bairro:               string;
    cidade:               string;
    uf:                   string;
    cep:                  string;
    telPrincipal:         string;
    latitudeDestino:      string;
    longitudeDestino:     string;
    latitudeCheckin:      null;
    longitudeCheckin:     null;
    latitudeCheckout:     null;
    longitudeCheckout:    null;
    dtAceite:             Date;
    dtRecusa:             null;
    situacao:             string;
    dtCadastro:           Date;
}

interface State {
    coletas: Coletas[] | null,
    coletaAceita: boolean | null,
    idsColetas: number[] | null
}

const initialState: State = {
    coletas: null,
    coletaAceita: null,
    idsColetas: []
}

const coletasSlice = createSlice({
    name: "coletas",
    initialState,
    reducers: {
        setColetas: (state, action: PayloadAction<any>) => {
            state.coletas = action.payload
        },
        setIdsColetas: (state, action: PayloadAction<any>) => {
            state.idsColetas?.push(action.payload)
        },
        setAcceptColeta: (state) => {
            state.coletaAceita = true
        },
        setRefuseColeta: (state) => {
            state.coletaAceita = false
        }
    }
})

export const { setColetas, setAcceptColeta, setRefuseColeta } = coletasSlice.actions
export default coletasSlice.reducer