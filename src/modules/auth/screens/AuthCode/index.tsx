import React from 'react'
import AutoHeightImage from 'react-native-auto-height-image'
import Render from '../../../../components/Screen/Render'
import Section from '../../../../components/Screen/Section'

const AuthCode: React.FC = () => {

    return(

        <>
            <Render 
                statusBarOptions = {{ barStyle: 'dark-content', backgroundColor: '#fff' }} 
                wrapperColor = '#fff'
                paddingBottom = {20}
            >
                <Section marginTop = {60} marginBottom = {110} center>
                    <AutoHeightImage
                        source = { require('../../../../assets/images/logo2.png') }
                        width = {240}
                    />
                </Section>
            </Render>
        </>

    )

}

export default AuthCode