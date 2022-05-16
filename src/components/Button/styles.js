import { StyleSheet } from "react-native"

export const buttonStyles = StyleSheet.create({
    gradient: {
        borderRadius: 8,
        shadowColor: '#5F5F5F',
        elevation: 5,
    },
    touchable: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})