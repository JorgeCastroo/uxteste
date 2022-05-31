import styled from 'styled-components/native'

export const PopupContainer = styled.View`
    width: 100%;
    padding: ${props => props.pad ? props.pad : '0px'};
    border-radius: 20px;
    background-color: #FFF;
`

export const PopupHeader = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 12px 20px;
    border-top-left-radius: 17px;
    border-top-right-radius: 17px;
    background-color: ${props => props.theme};
`

export const PopupMain = styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 12px;
`