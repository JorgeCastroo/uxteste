import { configureFonts } from "react-native-paper"

const defaultFonts = {
    default: {
        regular: {fontFamily: 'Roboto-Regular'},
        medium: {fontFamily: 'Roboto-Medium'},
        light: {fontFamily: 'Roboto-Light'},
        thin: {fontFamily: 'Roboto-LightItalic'},
    }
}

const fonts = configureFonts(defaultFonts)

export default fonts