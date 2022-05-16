import styled from 'styled-components/native'
import themes from '../../../../styles/themes'

export const Container = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100px;
    padding-top: 20px;
    background-color: ${themes.colors.primary};
`