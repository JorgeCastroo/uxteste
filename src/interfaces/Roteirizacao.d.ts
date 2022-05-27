import { Coordinates } from "./Coordinates"

export interface RoteirizacaoResponse {
    duration:         number
    formatedDuration: string
    distance:         number
    formatedDistance: string
    ordenedAdresses:  OrdenedAdress[]
    geometry:         string
}

export interface OrdenedAdress {
    position:    number
    id:          number
    description: string
}

export interface RoteirizacaoPayload {
    start:    Coordinates
    end:      Coordinates
    adresses: Adress[]
}

export interface Adress {
    description: string
    id:          number
    location:    Coordinates
}