export const colors = {
    primary: '#EE2209',
    secondary: '#196C39',
    tertiary: '#1966D0',
}

export const status = {
    error: {
        primary: '#ED2209',
        secondary: '#B21A07',
    },
    success: {
        primary: '#00AE57',
        secondary: '#03723A',
    },
    info: {
        primary: '#1967D3',
        secondary: '#074FB1',
    }
}

export const gradient = {
    primary: [colors.primary, colors.secondary],
    secondary: [status.info.primary, status.info.secondary],
    disabled: ['#EDEDED', '#A49A9A'],
}

export const statusBarColor = 'rgba(0,0,0,0.3)'

const themes = {
    gradient, colors, statusBarColor, status,
}

export default themes