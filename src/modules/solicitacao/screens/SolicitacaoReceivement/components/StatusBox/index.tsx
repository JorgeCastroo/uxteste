import React from 'react'
import { Text } from 'react-native-paper'
import { StatusBoxProps } from './types'
import * as S from './styles'
import { elevation } from '../../../../../../styles/layout'

const StatusBox: React.FC <StatusBoxProps> = ({ theme, text }) => {

    return(

        <S.Box style = {elevation.elevation2}>
            <Text style = {{color: '#333333', fontSize: 22}}>Pendentes</Text>
            <Text style = {{marginTop: 20, color: theme, fontSize: 32, fontWeight: 'bold'}}>{text}</Text>
        </S.Box>

    )

}

export default StatusBox