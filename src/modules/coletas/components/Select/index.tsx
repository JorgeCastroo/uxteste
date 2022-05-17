import React from 'react'
import { RadioButton } from 'react-native-paper'
import themes from '../../../../styles/themes'
import Section from '../../../../components/Screen/Section'
import ColetasSelectItem from './Item'

const ColetasSelect: React.FC = () => {

    const [selectAll, setSelectAll] = React.useState('0')

    return(

        <RadioButton.Group value = {selectAll} onValueChange = {setSelectAll}>
            <Section type = "row" marginTop = {30} marginBottom = {30} between>
                <ColetasSelectItem 
                    color = {themes.status.error.primary}
                    value = "0"
                    label = "Recusar todos"
                />
                <ColetasSelectItem 
                    color = {themes.status.success.primary}
                    value = "1"
                    label = "Aceitar todos"
                />
            </Section>
        </RadioButton.Group>

    )

}

export default ColetasSelect