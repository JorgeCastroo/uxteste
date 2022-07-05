import { Lista } from "../interfaces/Lista"

export default function filterSearch(listas: Lista[], searchvalue: string){
    const filteredEnderecos = listas.map(lista => lista.listaEnderecos.filter(f =>
        f.cep.includes(searchvalue) || 
        f.logradouro.toLowerCase().includes(searchvalue) || 
        f.numero.includes(searchvalue) || 
        f.bairro.toLowerCase().includes(searchvalue) || 
        f.cidade.toLowerCase().includes(searchvalue) || 
        f.uf.toLowerCase().includes(searchvalue) || 
        f.nomeCliente.toLowerCase().includes(searchvalue)
    )).flat(1)
    
    return filteredEnderecos
}