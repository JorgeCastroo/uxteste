import { Dimensions } from "react-native"
import { elevationPattern } from "../base"

export const marginHorizontal = 20

export const width = Dimensions.get("window").width

export const contentWidth = width - (marginHorizontal * 2)

export const logoMarginHorizontal = width - (marginHorizontal * 6)

export const setElevation = (elevation: number) => {
    return {
        ...elevationPattern,
        elevation,
    }
}

export const elevation = {
    elevation1: setElevation(1),
    elevation2: setElevation(2),
    elevation3: setElevation(3),
    elevation4: setElevation(4),
    elevation5: setElevation(5),
    elevation6: setElevation(6),

    set: setElevation,
}

const layout = {
    marginHorizontal, width, contentWidth, logoMarginHorizontal, elevation
} 

export default layout