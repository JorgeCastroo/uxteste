import React from 'react'
import { Searchbar } from 'react-native-paper'
import Section from '../../../../../../components/Screen/Section'
import themes from '../../../../../../styles/themes'

const SolicitacaoListSearchbar: React.FC = () => {

    const [searchValue, setSearchValue] = React.useState('')

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
                onChangeText = {text => setSearchValue(text)}
            />
        </Section>

    )

}

export default SolicitacaoListSearchbar