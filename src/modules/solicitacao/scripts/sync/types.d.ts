import { Volume } from "../../interfaces/Volume"
import { Coordinates } from "../../../../interfaces/Coordinates"

export interface SyncStartLista {
    idLista: number
    coords: Coordinates
}

export interface SyncSaveLista {
    idLista: number
    volumes: Volume[]
}

export interface SyncSendLista {
    idLista: number
    idRemetente: number
    volumes: Volume[]
}

export interface SyncCancelLista {
    idLista: number
    motivoCancelamento: string
}

export interface SyncCancelEnderecoLista {
    idLista: number
    idRemetente: number
}