import React from 'react'
import { MapMarkerProps } from './types'
import * as S from './styles'

const MapMarker: React.FC <MapMarkerProps> = ({ children, theme: { primary, tertiary } }) => {

    return(

        <S.MarkerWrapper>
            <S.MarkerIndicator theme = {primary}>
                <S.MarkerContent theme = {tertiary}>{children}</S.MarkerContent>
            </S.MarkerIndicator>
        </S.MarkerWrapper>

    )

}

export default MapMarker