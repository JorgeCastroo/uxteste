import React from 'react'
import { RadioButton } from 'react-native-paper'
import themes from '../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { setAcceptAllColetas, setRemoveAllColetas } from '../../reducers/coletas/coletas'
import Container from '../../../../components/Container'
import ColetasSelectItem from './Item'

const ColetasSelect: React.FC = () => {

    const dispatch = useAppDispatch()
    const { coletas } = useAppSelector(s => s.coletas)
    const [selectAll, setSelectAll] = React.useState('2')

    const handleSelect = (value: string) => {
        setSelectAll(value)
        if (value === '0') dispatch(setRemoveAllColetas(coletas!))
        else dispatch(setAcceptAllColetas(coletas!))
    }

    return (

        <RadioButton.Group value={selectAll} onValueChange={handleSelect}>
            <Container type="row" marginTop={24} marginBottom={24} between>
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
            </Container>
        </RadioButton.Group>

    )

}

export default ColetasSelect