import { LayoutRectangle } from "react-native-barcode-mask"

export const checkIfInside = (mask: LayoutRectangle, barcode: LayoutRectangle) => {
    return barcode.x >= mask.x
}