import themes from '../../../styles/themes';
import {idStatusLista} from '../../../constants/idStatusLista';

export default function getStatus(idStatus?: number) {
  if (idStatus) {
    if ([1, 2].includes(idStatus)) {
      return {
        label: 'Pedidos Pendentes',
        theme: themes.status.info,
      };
    }
    if (idStatus === idStatusLista.COLETANDO) {
      return {
        label: 'Coletando',
        theme: themes.status.progress,
      };
    }
    if (idStatus === idStatusLista.FINALIZADO) {
      return {
        label: 'Finalizado',
        theme: themes.status.success,
      };
    }
    if (idStatus === idStatusLista.CANCELADO) {
      return {
        label: 'Cancelado',
        theme: themes.status.error,
      };
    }
    if (idStatus === idStatusLista.PENDENTE) {
      return {
        label: 'Pendente de sincronização',
        theme: themes.status.pending,
      };
    }
  }
  return {
    label: 'Pedidos Pendentes',
    theme: themes.status.info,
  };
}
