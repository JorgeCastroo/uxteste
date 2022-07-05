import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import themes from '../../../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks'
import { setFilteredEndereco } from '../../../../reducers/lista/listaReducer'
import Section from '../../../../../../components/Screen/Section'
import filterSearch from '../../../../scripts/filterSearch'

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
        else dispatch(setFilteredEndereco(filterSearch(lista!, value) ?? []))
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