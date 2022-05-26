import React from 'react'
import { View } from 'react-native'
import themes from '../../../../../styles/themes'
import { useAppSelector } from '../../../../../redux/hooks'
import Section from '../../../../../components/Screen/Section'
import BoxStatus from '../../Box/Status'
import { idStatusLista } from '../../../../../constants/idStatusLista'

const GroupStatus: React.FC = () => {

    const { lista } = useAppSelector(s => s.lista)

    const { secondary, tertiary } = themes.colors
    const openListas = lista!.filter(i => i.situacao !== idStatusLista['FINALIZADO']).length.toString()
    const closedListas = lista!.filter(i => i.situacao === idStatusLista['FINALIZADO']).length.toString()

    return(

        <Section type = 'row' between>
            <BoxStatus icon = "truck" color = {tertiary} text = {openListas} />
            <View style = {{marginRight: 20}} />
            <BoxStatus icon = "check" color = {secondary} text = {closedListas} />
        </Section>

    )

}

export default GroupStatus