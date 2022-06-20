import { Coordinates } from "../../../../interfaces/Coordinates"

export interface SyncStartLista {
    idLista: number
    coords: Coordinates
}

export interface SyncSaveLista {
    idLista: number
    volumes: number[]
}

export interface SyncCancelLista {
    idLista: number
    motivoCancelamento: string
}