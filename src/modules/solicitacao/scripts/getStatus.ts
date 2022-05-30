import { idStatusLista } from "../../../constants/idStatusLista"
import themes from "../../../styles/themes"

export default function getStatus(idStatus: number){
    if([1, 2, 3].includes(idStatus)){
        return {
            label: 'Em Aberto',
            theme: themes.status.info,
        }
    }
    if(idStatus === idStatusLista.FINALIZADO){
        return{
            label: 'Finalizado',
            theme: themes.status.success,
        }
    }
    return {
        label: 'Cancelado',
        theme: themes.status.error,
    }
}