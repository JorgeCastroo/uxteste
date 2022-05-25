import React from 'react'
import { Searchbar } from 'react-native-paper'
import themes from '../../../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks'
import { setFilteredLista } from '../../../../reducers/lista/listaReducer'
import Section from '../../../../../../components/Screen/Section'

const SolicitacaoListSearchbar: React.FC = () => {

    const dispatch = useAppDispatch()
    const { lista } = useAppSelector(s => s.lista)
    const [searchValue, setSearchValue] = React.useState('')

    const handleClean = () => {
        setSearchValue('')
        dispatch(setFilteredLista(null))
    }

    const handleSearch = (value: string) => {
        const filteredLista = lista!.filter(f => f.cep.includes(value) || f.logradouro.includes(value) || f.numero.includes(value) || f.bairro.includes(value) || f.cidade.includes(value) || f.uf.includes(value))
        dispatch(setFilteredLista(filteredLista ?? []))
    }

    return(

        <Section marginTop = {20} marginBottom = {20}>
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