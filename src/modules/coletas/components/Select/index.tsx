import React, { useEffect } from 'react'
import { RadioButton } from 'react-native-paper'
import themes from '../../../../styles/themes'
import Section from '../../../../components/Screen/Section'
import ColetasSelectItem from './Item'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { setAcceptAllColetas, setRemoveAllColetas } from '../../reducers/coletas/coletas'

const ColetasSelect: React.FC = () => {

    const dispatch = useAppDispatch()
    const coletas = useAppSelector(s => s.coletas.coletas)
    const [selectAll, setSelectAll] = React.useState('2')

    const handleSelect = (value: string) => {
        setSelectAll(value)
        if (value === '0') dispatch(setRemoveAllColetas(coletas))
        else dispatch(setAcceptAllColetas(coletas))
    }

    return (

        <RadioButton.Group value={selectAll} onValueChange={handleSelect}>
            <Section type="row" marginTop={30} marginBottom={30} between>
                <ColetasSelectItem
                    color={themes.status.error.primary}
                    value="0"
                    label="Recusar todos"
                />
                <ColetasSelectItem
                    color={themes.status.success.primary}
                    value="1"
                    label="Aceitar todos"
                />
            </Section>
        </RadioButton.Group>

    )

}

export default ColetasSelect