import { Lista } from "../interfaces/Lista"

export default function filterSearch(listas: Lista[], searchvalue: string){
    const filteredEnderecos = listas.map(lista => lista.listaEnderecos.filter(f =>
        f.cep.includes(searchvalue) || 
        f.logradouro.toLowerCase().includes(searchvalue.toLowerCase()) || 
        f.numero.includes(searchvalue) || 
        f.bairro.toLowerCase().includes(searchvalue.toLowerCase()) || 
        f.cidade.toLowerCase().includes(searchvalue.toLowerCase()) || 
        f.uf.toLowerCase().includes(searchvalue.toLowerCase()) || 
        f.nomeCliente.toLowerCase().includes(searchvalue.toLowerCase())
    )).flat(1)
    
    return filteredEnderecos
}