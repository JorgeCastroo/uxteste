import React from 'react'
import { View } from 'react-native'
import themes from '../../../../../styles/themes'
import Section from '../../../../../components/Screen/Section'
import BoxInfo from '../../Box/Info'

const GroupInfo: React.FC = () => {

    return(

        <Section type = 'row' marginBottom = {20} between>
            <BoxInfo icon = 'navigation' color = {themes.colors.tertiary} text = {['44Km', '49:47']} />
            <View style = {{marginRight: 20}} />
            <BoxInfo icon = 'flag' color = {themes.colors.tertiary} text = {'2'} />
        </Section>

    )

}

export default GroupInfo