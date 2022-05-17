import styled from 'styled-components/native'

export const Wrapper = styled.View`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.align};
    align-items: ${props => props.align && props.align === 'center' ? 'center' : 'flex-start'};
    flex: 1;
    padding-bottom: ${props => props.align && props.align === 'center' ? '0px' : props.pad ?? '90px'};
    background-color: transparent;
`