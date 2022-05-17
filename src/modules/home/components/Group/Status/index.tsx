import React from 'react'
import { View } from 'react-native'
import Section from '../../../../../components/Screen/Section'
import themes from '../../../../../styles/themes'
import BoxStatus from '../../Box/Status'

const GroupStatus: React.FC = () => {

    const { primary, secondary, tertiary } = themes.colors

    return(

        <Section type = 'row' between>
            <BoxStatus icon = "truck" color = {tertiary} text = "0" />
            <View style = {{marginRight: 14}} />
            <BoxStatus icon = "alert-circle" color = {primary} text = "0" />
            <View style = {{marginRight: 14}} />
            <BoxStatus icon = "check" color = {secondary} text = "0" />
        </Section>

    )

}

export default GroupStatus