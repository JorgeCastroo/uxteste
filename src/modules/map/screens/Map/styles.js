import styled from 'styled-components/native'

export const MarkerWrapper = styled.View`
    width: 32px;
    height: 40px;
`

export const MarkerIndicator = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom-left-radius: 16px;
    background-color: ${props => props.color};
    opacity: 0.9;

    transform: rotate(45deg);
`