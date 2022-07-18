export const colors = {
    primary: '#EE2209',
    secondary: '#196C39',
    tertiary: '#1966D0',
}

export const status = {
    error: {
        primary: '#ED2209',
        secondary: '#B21A07',
        tertiary: '#fce8e6',
    },
    success: {
        primary: '#00AE57',
        secondary: '#03723A',
        tertiary: '#e6f4ea',
    },
    info: {
        primary: '#1967D3',
        secondary: '#074FB1',
        tertiary: '#e8f0fe',
    }
}

export const gradient = {
    primary: [colors.primary, colors.secondary],
    secondary: ['#1967D3', '#074FB1'],
    disabled: ['#EDEDED', '#A49A9A'],

    success: [status.success.primary, status.success.secondary],
}

export const statusBarColor = 'rgba(0,0,0,0.3)'

const themes = {
    gradient, colors, statusBarColor, status,
}

export default themes