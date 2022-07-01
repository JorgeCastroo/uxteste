import React from 'react'
import { View } from 'react-native'
import themes from '../../../../../styles/themes'
import { useAppSelector } from '../../../../../redux/hooks'
import Section from '../../../../../components/Screen/Section'
import BoxStatus from '../../Box/Status'
import { idStatusLista } from '../../../../../constants/idStatusLista'

const GroupStatus: React.FC = () => {

    const { lista } = useAppSelector(s => s.lista)

    const { primary, secondary, tertiary } = themes.colors

    const openListas = lista!.map(l => l.listaEnderecos.filter(i => [1, 2, 3].includes(i.situacao ?? idStatusLista['APROVADO']))).flat(1).length.toString()
    const canceledListas = lista!.map(l => l.listaEnderecos.filter(i => i.situacao === idStatusLista['CANCELADO'])).flat(1).length.toString()
    const closedListas = lista!.map(l => l.listaEnderecos.filter(i => i.situacao === idStatusLista['FINALIZADO'])).flat(1).length.toString()

    return(

        <Section type = 'row' between>
            <BoxStatus icon = "truck" color = {tertiary} text = {openListas} />
            <View style = {{marginRight: 20}} />
            <BoxStatus icon = "information" color = {primary} text = {canceledListas} />
            <View style = {{marginRight: 20}} />
            <BoxStatus icon = "check" color = {secondary} text = {closedListas} />
        </Section>

    )

}

export default GroupStatus