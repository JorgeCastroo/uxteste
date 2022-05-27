import React from 'react'
import { View } from 'react-native'
import themes from '../../../../../styles/themes'
import { useAppSelector } from '../../../../../redux/hooks'
import Section from '../../../../../components/Screen/Section'
import BoxInfo from '../../Box/Info'

const GroupInfo: React.FC = () => {

    const { lista } = useAppSelector(s => s.lista)
    const { roteirizacao } = useAppSelector(s => s.roteirizacao)

    return(

        <Section type = 'row' marginBottom = {20} between>
            <BoxInfo icon = 'navigation' color = {themes.colors.tertiary} text = {[roteirizacao!.formatedDistance, roteirizacao!.formatedDuration.slice(0,5)]} />
            <View style = {{marginRight: 20}} />
            <BoxInfo icon = 'flag' color = {themes.colors.tertiary} text = {lista!.length.toString()} />
        </Section>

    )

}

export default GroupInfo