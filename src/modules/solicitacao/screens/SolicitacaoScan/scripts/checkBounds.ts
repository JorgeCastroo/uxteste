import { LayoutRectangle } from "react-native-barcode-mask"

export default function checkIfInside(mask: LayoutRectangle, barcode: LayoutRectangle){
    return barcode.x >= mask.x
}