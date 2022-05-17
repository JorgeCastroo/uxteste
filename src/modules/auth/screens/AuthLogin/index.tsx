import React from 'react'
import Render from '../../../../components/Screen/Render'
import Section from '../../../../components/Screen/Section'
import AutoHeightImage from 'react-native-auto-height-image'
import Form from './components/Form'

const AuthLogin: React.FC = () => {

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
                <Form />
            </Render>
        </>

    )

}

export default AuthLogin