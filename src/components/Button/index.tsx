import React from 'react'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { ActivityIndicator, Text, TouchableRipple } from 'react-native-paper'
import { ButtonProps } from './types'
import { buttonStyles } from './styles'
import themes from '../../styles/themes'
import layout from '../../styles/layout'

const Button: React.FC <ButtonProps> = ({ color, label, marginHorizontal, marginBottom, disabled, loading, onPress }) => {

    return(

        <View style = {{ marginBottom }}>
            <LinearGradient
                style = {[buttonStyles.gradient, { marginHorizontal: marginHorizontal ? (layout.marginHorizontal * 1.5) : 0 }]}
                colors = {disabled ? themes.gradient.disabled : color ?? themes.gradient.secondary}
                useAngle
                angleCenter = {{ x: 0.5, y: 0.5 }}
                angle = {90}
            >
                <TouchableRipple style = {buttonStyles.touchable} disabled = {disabled} onPress = {() => onPress && onPress()}>
                    <>
                        {loading && <ActivityIndicator color = "#ffffff" size = {16} />}
                        <Text style = {buttonStyles.label}>{label}</Text>
                    </>
                </TouchableRipple>
            </LinearGradient>
        </View>

    )

}

export default Button