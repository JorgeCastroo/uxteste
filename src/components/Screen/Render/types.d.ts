export interface ScreenStatusBarProps {
    barStyle?: 'light-content' | 'dark-content'
    backgroundColor?: string
    translucent?: boolean
    animated?: boolean
}

export interface ScreenRenderProps {
    statusBarOptions?: ScreenStatusBarProps
    align?: 'center' | 'flex-start' | 'space-between'
    wrapperColor?: string
    paddingBottom?: number
    onRefresh?: Function
    loadingColor?: string[],
}