import React from 'react'
import { RadioButton, Text } from 'react-native-paper'
import { ColetasSelectItemProps } from './types'
import Container from '../../../../../components/Container'

const ColetasSelectItem: React.FC <ColetasSelectItemProps> = ({ color, value, label }) => {

    return(

        <Container type = "row" width = "50%" padding = {false} center>
            <RadioButton value = {value} color = {color} uncheckedColor = "#C4C4C4" />
            <Text style = {{color, fontSize: 18, fontWeight: 'bold'}}>{label}</Text>
        </Container>

    )

}

export default ColetasSelectItem