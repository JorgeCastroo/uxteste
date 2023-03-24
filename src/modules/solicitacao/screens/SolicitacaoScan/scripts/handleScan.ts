import {StatusBar} from 'react-native';
import {Barcode} from 'react-native-camera';
import {showMessage} from 'react-native-flash-message';
import Sound from 'react-native-sound';
import {Endereco, Lista} from '../../../interfaces/Lista';
import {setScanning} from '../../../reducers/solicitacaoScan/solicitacaoScanReducer';
import {scanEnderecoVolume} from '../../../reducers/lista/listaReducer';
import info from '../../../../../utils/info';
import sleep from '../../../../../utils/sleep';
//@ts-ignore
import BeepSuccessAudio from '../../../../../assets/audio/beep_success.mp3';
//@ts-ignore
import BeepErrorAudio from '../../../../../assets/audio/beep_error.mp3';
import getScannedVolumes from '../../../scripts/getScannedVolumes';
import moment from 'moment';

Sound.setCategory('Playback');

const beepSuccess = new Sound(BeepSuccessAudio, error => {
  if (error) {
    info.error('beepSuccess', error);
    return;
  }
});

const beepError = new Sound(BeepErrorAudio, error => {
  if (error) {
    info.error('beepError', error);
    return;
  }
});

export default async function handleScan(
  lista: Lista[],
  dispatch: Function,
  code: Barcode,
  currentSolicitacao: Endereco,
) {
  try {
    dispatch(setScanning(true));

    let flashMessage = {message: '', type: ''};
    var listaReferencia: Lista[] = JSON.parse(JSON.stringify(lista!));

    if (
      currentSolicitacao.listaVolumes
        .map(item => item.etiqueta)
        .includes(code.data)
    ) {
      if (!getScannedVolumes(currentSolicitacao).includes(code.data)) {
        dispatch(scanEnderecoVolume(code.data));

        var curentLista = listaReferencia?.find(
          item => item.idLista === currentSolicitacao?.idLista,
        );
        var currentEndereco = curentLista?.listaEnderecos!.find(
          item => item.idRemetente === currentSolicitacao?.idRemetente,
        );

        currentEndereco?.listaVolumes.forEach(item => {
          if (item.etiqueta === code.data) {
            item.dtLeituraFirstMile = moment().format('DD/MM/YYYY');
          }
        });

        beepSuccess.play();
        flashMessage = {message: 'Código lido com sucesso!', type: 'success'};
      } else {
        beepError.play();
        flashMessage = {message: 'Código já lido!', type: 'danger'};
      }
    } else {
      beepError.play();
      flashMessage = {message: 'Código não encontrado!', type: 'danger'};
    }
    showMessage({
      ...(flashMessage as any),
      statusBarHeight: StatusBar.currentHeight,
    });
    await sleep(2000);
  } catch (error) {
    info.error('handleScan', error);
  } finally {
    dispatch(setScanning(false));
  }
}
