import React from 'react'
import { Searchbar } from 'react-native-paper'
import themes from '../../../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks'
import { setFilteredLista } from '../../../../reducers/lista/listaReducer'
import Section from '../../../../../../components/Screen/Section'
import { idStatusLista } from '../../../../../../constants/idStatusLista'

const SolicitacaoListSearchbar: React.FC = () => {

    const dispatch = useAppDispatch()
    const { lista } = useAppSelector(s => s.lista)
    const [searchValue, setSearchValue] = React.useState('')

    const handleClean = () => {
        setSearchValue('')
        dispatch(setFilteredLista(null))
    }

    const handleSearch = (value: string) => {
        if(value === '') handleClean()
        else{
            const filteredLista = lista!
            .filter(f => f.situacao !== idStatusLista['FINALIZADO'])
            .filter(f =>
                f.cep.includes(value) || 
                f.logradouro.toLowerCase().includes(value.toLowerCase()) || 
                f.numero.includes(value) || 
                f.bairro.toLowerCase().includes(value.toLowerCase()) || 
                f.cidade.toLowerCase().includes(value.toLowerCase()) || 
                f.uf.toLowerCase().includes(value.toLowerCase()) || 
                f.nomeResponsavel.toLowerCase().includes(value.toLowerCase()) ||
                f.nomeCliente.toLowerCase().includes(value.toLowerCase())
            )
            dispatch(setFilteredLista(filteredLista ?? []))
        }
    }

    return(

        <Section marginTop = {20}>
            <Searchbar
                placeholder = "Pesquisar"
                theme = {{
                    colors: {
                        primary: themes.colors.primary
                    }
                }}
                style = {{
                    borderRadius: 12,
                }}
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