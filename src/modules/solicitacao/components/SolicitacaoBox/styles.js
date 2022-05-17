import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export const styles = StyleSheet.create({
    Box: {
        position: 'relative',
        width: '100%',
        marginBottom: 24,
        borderRadius: 2,
        backgroundColor: '#fff'
    }
})

export const PositionIndicator = styled.View`
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background-color: ${props => props.theme};
`



export const StatusContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 16px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-color: ${props => props.theme};
`