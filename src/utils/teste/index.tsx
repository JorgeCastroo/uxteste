import {Lista} from '../../modules/solicitacao/interfaces/Lista';

export function tornarListasIdenticas(lista1: Lista, lista2: Lista): Lista {
  if (lista1.idLista !== lista2.idLista) {
    throw new Error('As listas precisam ter o mesmo idLista');
  }

  const novaLista: Lista = {
    idLista: lista1.idLista,
    idUsuario: lista1.idUsuario || lista2.idUsuario,
    situacao: lista1.situacao || lista2.situacao,
    rota: lista1.rota || lista2.rota,
    dtCadastro: lista1.dtCadastro || lista2.dtCadastro,
    qtdeTotalVolumes: lista1.qtdeTotalVolumes || lista2.qtdeTotalVolumes,
    listaEnderecos: [],
  };

  const enderecos1 = lista1.listaEnderecos || [];
  const enderecos2 = lista2.listaEnderecos || [];
  const todosOsEnderecos = new Set([...enderecos1, ...enderecos2]);

  for (const endereco of todosOsEnderecos) {
    const enderecoExistente = novaLista.listaEnderecos.find(
      e => e.idLista === endereco.idLista && e.rota === endereco.rota,
    );

    if (enderecoExistente) {
      enderecoExistente.idRemetente =
        endereco.idRemetente || enderecoExistente.idRemetente;
      enderecoExistente.nomeCliente =
        endereco.nomeCliente || enderecoExistente.nomeCliente;
      enderecoExistente.nomeResponsavel =
        endereco.nomeResponsavel || enderecoExistente.nomeResponsavel;
      enderecoExistente.documentoResponsavel =
        endereco.documentoResponsavel || enderecoExistente.documentoResponsavel;
      enderecoExistente.logradouro =
        endereco.logradouro || enderecoExistente.logradouro;
      enderecoExistente.numero = endereco.numero || enderecoExistente.numero;
      enderecoExistente.bairro = endereco.bairro || enderecoExistente.bairro;
      enderecoExistente.cidade = endereco.cidade || enderecoExistente.cidade;
      enderecoExistente.uf = endereco.uf || enderecoExistente.uf;
      enderecoExistente.cep = endereco.cep || enderecoExistente.cep;
      enderecoExistente.telPrincipal =
        endereco.telPrincipal || enderecoExistente.telPrincipal;
      enderecoExistente.latitudeDestino =
        endereco.latitudeDestino || enderecoExistente.latitudeDestino;
      enderecoExistente.longitudeDestino =
        endereco.longitudeDestino || enderecoExistente.longitudeDestino;
      enderecoExistente.situacao =
        endereco.situacao || enderecoExistente.situacao;
      enderecoExistente.qtdeVolumes =
        endereco.qtdeVolumes || enderecoExistente.qtdeVolumes;
      enderecoExistente.listaVolumes = [
        ...new Set([
          ...endereco.listaVolumes,
          ...enderecoExistente.listaVolumes,
        ]),
      ];
    } else {
      novaLista.listaEnderecos.push({
        idLista: endereco.idLista,
        rota: endereco.rota,
        idRemetente: endereco.idRemetente || 0,
        nomeCliente: endereco.nomeCliente || '',
        nomeResponsavel: endereco.nomeResponsavel || '',
        documentoResponsavel: endereco.documentoResponsavel || '',
        logradouro: endereco.logradouro || '',
        numero: endereco.numero || '',
        bairro: endereco.bairro || '',
        cidade: endereco.cidade || '',
        uf: endereco.uf || '',
        cep: endereco.cep || '',
        telPrincipal: endereco.telPrincipal || '',
        latitudeDestino: endereco.latitudeDestino || '',
        longitudeDestino: endereco.longitudeDestino || '',
        situacao: endereco.situacao || 0,
        qtdeVolumes: endereco.qtdeVolumes || 0,
        listaVolumes: endereco.listaVolumes || [],
      });
    }
  }

  return novaLista;
}
