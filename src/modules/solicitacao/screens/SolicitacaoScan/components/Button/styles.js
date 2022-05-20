import styled from 'styled-components/native'
import themes from '../../../../../../styles/themes'

export const IconTouchable = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    border-radius: 8px;
    background-color: ${props => props.theme === true ? themes.colors.tertiary : 'transparent'};
`