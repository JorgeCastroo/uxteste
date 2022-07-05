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
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    label: {
        paddingVertical: 14,
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})