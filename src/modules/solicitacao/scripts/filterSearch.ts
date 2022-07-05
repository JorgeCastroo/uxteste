import { Lista } from "../interfaces/Lista"

export default function filterSearch(listas: Lista[], searchValue: string){
    const filteredEnderecos = listas.map(lista => lista.listaEnderecos.filter(f =>
        f.cep.includes(searchValue) || 
        f.logradouro.toLowerCase().includes(searchValue) || 
        f.numero.includes(searchValue) || 
        f.bairro.toLowerCase().includes(searchValue) || 
        f.cidade.toLowerCase().includes(searchValue) || 
        f.uf.toLowerCase().includes(searchValue) || 
        f.nomeCliente.toLowerCase().includes(searchValue) ||
        f.rota.toLowerCase().includes(searchValue)
    )).flat(1)
    
    return filteredEnderecos
}