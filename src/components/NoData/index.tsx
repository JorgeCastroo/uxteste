import React from 'react'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NoDataProps } from './types'
import Section from '../Screen/Section'

const NoData: React.FC <NoDataProps> = ({ emoji, message }) => {

    return(

        <Section marginTop = {20} center>
            <MaterialCommunityIcons name = {`emoticon-${emoji}-outline`} size = {80} />
            {message.map((text, index) => <Text key = {index} style = {{color: '#333', textAlign: 'center'}}>{text}</Text>)}
        </Section>

    )

}

export default NoData