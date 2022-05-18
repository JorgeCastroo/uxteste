import { KeyboardTypeOptions, StyleProp, TextStyle } from "react-native"

export type FormInputProps = {
    id: string,
    mode?: "outlined" | "flat",
    label?: string,
    placeholder?: string,
    keyboardType?: KeyboardTypeOptions,
    value: string,
    error?: boolean,
    secure?: boolean,
    editable?: boolean,
    mask?: string,
    style?: StyleProp<TextStyle>,
    lines?: number,
    handleChange: Function,
}