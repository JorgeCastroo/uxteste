import styled from 'styled-components/native'

export const Box = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 84px;
    margin-top: 12px;
    border-radius: 10px;
    background-color: #fff;
`

export const Indicator = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 84px;
    height: 84px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: #DBFFEC;
`

export const TextContainer = styled.View`
    display: flex;
    flex-shrink: 1;
    padding-left: 20px;
`

export const IconArea = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin-right: 8px;

`