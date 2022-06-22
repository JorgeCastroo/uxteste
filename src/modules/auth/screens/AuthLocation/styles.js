import styled from 'styled-components/native'
import layout from '../../../../styles/layout'
import toPixel from '../../../../utils/toPixel'

export const Header = styled.View`
    width: 100%;
    height: 300px;
    border-bottom-left-radius: ${toPixel(layout.width / 2)};
    border-bottom-right-radius: ${toPixel(layout.width / 2)};
    background-color: #F2F2F2;
`