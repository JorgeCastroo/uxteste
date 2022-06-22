export interface ButtonProps {
    type?: 'default' | 'success'
    active: boolean
    label: string
    icon: string
    onPress: () => void
}