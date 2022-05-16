import React from 'react'
import AutoHeightImage from 'react-native-auto-height-image'
import * as S from './styles'

const HomeHeader: React.FC = () => {

    return(

        <S.Container>
            <AutoHeightImage
                source = {require('../../../../assets/images/logo.png')}
                width = {150}
            />
        </S.Container>

    )

}

export default HomeHeader