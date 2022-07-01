import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import themes from '../../../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks'
import { setFilteredEndereco } from '../../../../reducers/lista/listaReducer'
import Section from '../../../../../../components/Screen/Section'

const SolicitacaoListSearchbar: React.FC = () => {

    const dispatch = useAppDispatch()
    const { lista } = useAppSelector(s => s.lista)
    const [searchValue, setSearchValue] = useState('')

    const handleClean = () => {
        setSearchValue('')
        dispatch(setFilteredEndereco(null))
    }

    const handleSearch = (value: string) => {
        if(value === '') handleClean()
        else{
            const filteredEnderecos = lista!
            .filter(f => ![5, 6].includes(f.situacao))
            .map(lista => lista.listaEnderecos.filter(f =>
                f.cep.includes(value) || 
                f.logradouro.toLowerCase().includes(value.toLowerCase()) || 
                f.numero.includes(value) || 
                f.bairro.toLowerCase().includes(value.toLowerCase()) || 
                f.cidade.toLowerCase().includes(value.toLowerCase()) || 
                f.uf.toLowerCase().includes(value.toLowerCase()) || 
                f.nomeCliente.toLowerCase().includes(value.toLowerCase())
            )).flat(1)
            dispatch(setFilteredEndereco(filteredEnderecos ?? []))
        }
    }

    return(

        <Section marginTop = {20}>
            <Searchbar
                placeholder = "Pesquisar"
                theme = {{colors: {primary: themes.colors.primary}}}
                style = {{borderRadius: 12}}
                value = {searchValue}
                onIconPress = {handleClean}
                onChangeText = {text => {
                    setSearchValue(text)
                    handleSearch(text)
                }}
            />
        </Section>

    )

}

export default SolicitacaoListSearchbar