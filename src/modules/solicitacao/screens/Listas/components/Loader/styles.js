import { StyleSheet } from "react-native"
import styled from "styled-components/native"
import themes from "../../../../../../styles/themes"

export const style = StyleSheet.create({
    animatedBar : {
        position: 'relative',
        width: 100,
        height: 16,
        borderRadius: 8,
        backgroundColor: themes.colors.primary,
    }
})

export const LoadingBarContainer = styled.View`
    width: 100%;
    border-radius: 8px;
    background-color: rgba(0,0,0,0.1);
`

export const LoadingIconContainer = styled.View`
    position: absolute;
    top: -48px;
    right: 0;

    width: 48px;

    z-index: 200;
`