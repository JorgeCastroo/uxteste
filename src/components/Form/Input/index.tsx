import React, { useRef, useState } from 'react'
import { TextInput } from 'react-native-paper'
import TextInputMask from 'react-native-text-input-mask'
import { FormInputProps } from './types'
import themes from '../../../styles/themes'

const FormInput: React.FC <FormInputProps> = ({ id, mode, label, placeholder, keyboardType, value, error, editable, secure, mask, lines, style, handleChange }) => {

    const inputRef = useRef(null)
    const [showSecure, setShowSecure] = useState<boolean | undefined>(secure)

    const inputProps = {
        ref: inputRef,
        label: label,
        keyboardType: keyboardType ? keyboardType : 'default',
        theme: {
            colors: {
                primary: themes.colors.primary,
                background: '#F7F7F7',
                placeholder: '#C9C9C9',
            },
            roundness: 8,
        },
        selectionColor: themes.colors.primary,
        outlineColor: 'transparent',
        editable: editable ?? true,
        error: !!error ?? false,
        secureTextEntry: showSecure,
        multiline: lines ? true : false,
        numberOfLines: lines ? lines : 1,
    }

    const handleChangeText = (text: string) => {
        handleChange(id, text)
    }

    return(

        <>
            {mask ? (
                <TextInput
                    {...inputProps}
                    mode = {mode ?? 'outlined'}
                    autoCapitalize = 'none'
                    style = {{fontWeight: 'bold'}}
                    placeholder = {placeholder}
                    value = {value}
                    render = {props => (
                        <TextInputMask
                            {...props}
                            ref = {inputRef}
                            mask = {mask}
                            value = {value}
                            onChangeText = {(formatted, extracted) => {
                                props.onChangeText?.(extracted ?? ''),
                                handleChangeText(extracted ?? '')
                            }}
                        />
                    )}
                />
            ) : (
                <TextInput
                    {...inputProps}
                    mode = {mode ?? 'outlined'}
                    autoCapitalize = 'none'
                    style = {{fontWeight: 'bold'}}
                    placeholder = {placeholder}
                    value = {value}
                    onChangeText = {text => handleChangeText(text)}
                    right = {
                        !!secure ? (
                            <TextInput.Icon
                                name = "eye-outline"
                                color = {showSecure ? '#242737' : themes.colors.primary}
                                forceTextInputFocus = {false}
                                onPress = {() => setShowSecure(!showSecure)}
                            />
                        ) : !!error ? (
                            <TextInput.Icon
                                name = "alert-circle"
                                color = {'red'} //! ALTERAR
                                forceTextInputFocus = {false}
                            />
                        ) : null
                    }
                />
            )}
        </>

    )

}

export default FormInput