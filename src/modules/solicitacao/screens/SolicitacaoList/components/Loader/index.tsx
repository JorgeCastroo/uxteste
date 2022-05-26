import React, { useEffect, useState } from 'react'
import { Animated } from 'react-native'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { LoaderProps } from './types'
import * as S from './styles'
import themes from '../../../../../../styles/themes'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks'
import Container from '../../../../../../components/Container'
import Section from '../../../../../../components/Screen/Section'

const Loader: React.FC <LoaderProps> = ({ percent }) => {

    const dispatch = useAppDispatch()
    const { roteirizacao } = useAppSelector(s => s.roteirizacao)
    const [animationValue] = useState(new Animated.Value(0))
    const animationDuration = 2000

    const animatedStyle = {
        width: animationValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
        })
    }

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: percent,
            duration: animationDuration,
            useNativeDriver: false,
        }).start()
    }, [dispatch, percent])

    return(

        <Section center>
            <Container padding = {false} center>
                <Text style = {{color: '#787878', fontSize: 22, fontWeight: 'bold'}}>Roteirizando a melhor rota</Text>
            </Container>
            <Container marginTop = {100} marginBottom = {100} padding = {false} center>
                <S.LoadingBarContainer>
                    <Animated.View style = {[S.style.animatedBar, animatedStyle]}>
                        <S.LoadingIconContainer>
                            <MaterialCommunityIcons name = "truck-fast" size = {48} color = {themes.colors.primary} />
                        </S.LoadingIconContainer>
                    </Animated.View>
                </S.LoadingBarContainer> 
            </Container>
            {!!roteirizacao && (
                <>
                    <Container type = "row" padding = {false} center>
                        <Text style = {{marginRight: 8, color: '#787878', fontSize: 22, fontWeight: 'bold'}}>Distância total:</Text>
                        <Text style = {{color: themes.colors.primary, fontSize: 22, fontWeight: 'bold'}}>{roteirizacao.formatedDistance}</Text>
                    </Container>
                    <Container type = "row" padding = {false} center>
                        <Text style = {{marginRight: 8, color: '#787878', fontSize: 22, fontWeight: 'bold'}}>Tempo:</Text>
                        <Text style = {{color: themes.colors.primary, fontSize: 22, fontWeight: 'bold'}}>{roteirizacao.formatedDuration ?? '0'}</Text>
                    </Container>
                </>
            )}
        </Section>

    )

}

export default Loader