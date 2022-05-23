import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Coletas {
    id: number;
    idUsuario: number;
    nomeCliente: string;
    nomeResponsavel: string;
    documentoResponsavel: string;
    qtdeVolumes: number;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    telPrincipal: string;
    latitudeDestino: string;
    longitudeDestino: string;
    latitudeCheckin: null;
    longitudeCheckin: null;
    latitudeCheckout: null;
    longitudeCheckout: null;
    dtAceite: Date;
    dtRecusa: null;
    situacao: string;
    dtCadastro: Date;
}

interface Volumes {
    id: number,
    idLista: number,
    etiqueta: string,
    dtLeitura: Date,
    status: string
}

interface State {
    coletas: Coletas[],
    volumes: Volumes[],
    coletasOffline: Coletas[],
    volumesOffline: Volumes[],
    coletaAceita: boolean | null,
    idsColetasAprovadas: number[],
    idsColetasReprovadas: number[],
    idStatusColetas: {
        ENVIADO: 1,
        APROVADO: 2,
        COLETANDO: 3,
        REPROVADO: 4,
        FINALIZADO: 5
    }
}

// 1 - "ENVIADO" | 2 - "APROVADO" | 3 - "COLETANDO" | 4 - "REPROVADO" | 5 - "FINALIZADO"

const initialState: State = {
    coletas: [],
    volumes: [],
    coletasOffline: [],
    volumesOffline: [],
    coletaAceita: null,
    idsColetasAprovadas: [],
    idsColetasReprovadas: [],
    idStatusColetas: {
        ENVIADO: 1,
        APROVADO: 2,
        COLETANDO: 3,
        REPROVADO: 4,
        FINALIZADO: 5
    }
}

const coletasSlice = createSlice({
    name: "coletas",
    initialState,
    reducers: {
        setColetas: (state, action: PayloadAction<any>) => {
            state.coletas = action.payload
        },
        setVolumes: (state, action: PayloadAction<any>) => {
            state.volumes = action.payload
        },
        setColetasOffline: (state, action: PayloadAction<any>) => {
            for (let i in state.coletasOffline) {
                if (action.payload.id === state.coletasOffline[i].id)
                    state.coletasOffline.push(action.payload)
            }
        },
        setVolumesOffline: (state) => {
            for (let i in state.idsColetasAprovadas) {
                if (state.volumes[i].id === state.idsColetasAprovadas[i]) {
                    state.volumesOffline.push(state.volumes[i])
                }
            }
        },
        setIdsColetas: (state, action: PayloadAction<any>) => {
            if (!state.idsColetasAprovadas.includes(action.payload) && !state.idsColetasReprovadas.includes(action.payload)) {
                state.idsColetasAprovadas.push(action.payload)
            } else if (state.idsColetasReprovadas.includes(action.payload)) {
                const removedIdIndex = state.idsColetasReprovadas.indexOf(action.payload)
                state.idsColetasReprovadas.splice(removedIdIndex, 1)
                state.idsColetasAprovadas.push(action.payload)
            }
        },
        setAcceptAllColetas: (state, action: PayloadAction<any>) => {
            state.idsColetasAprovadas = action.payload
            state.idsColetasReprovadas = []
        },
        setRemoveIdsColetas: (state, action: PayloadAction<any>) => {
            if (!state.idsColetasReprovadas.includes(action.payload) && !state.idsColetasAprovadas.includes(action.payload)) {
                state.idsColetasReprovadas.push(action.payload)
            } else if (state.idsColetasAprovadas.includes(action.payload)) {
                const aprovedIdIndex = state.idsColetasAprovadas.indexOf(action.payload)
                state.idsColetasAprovadas.splice(aprovedIdIndex, 1)
                state.idsColetasReprovadas.push(action.payload)
            }
        },
        setRemoveAllIdsColetas: (state, action: PayloadAction<any>) => {
            state.idsColetasReprovadas = action.payload
            state.idsColetasAprovadas = []
        }
    }
})

export const {
    setColetas,
    setVolumes,
    setIdsColetas,
    setRemoveIdsColetas,
    setColetasOffline,
    setVolumesOffline,
    setRemoveAllIdsColetas,
    setAcceptAllColetas } = coletasSlice.actions
export default coletasSlice.reducer