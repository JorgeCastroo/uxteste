import styled from 'styled-components/native'
import themes from '../../../../styles/themes'

export const Container = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 66px;
    background-color: #fff;
`

export const CenterItem = styled.View`
    width: 58px;
    height: 58px;
    margin-top: -58px;
    border-radius: 29px;
    background-color: ${themes.colors.primary};
`

export const CenterItemTouchable = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 29px;
`