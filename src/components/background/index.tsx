import React, { ReactNode } from "react"
import { LinearGradient } from 'expo-linear-gradient'
import { style } from './styles'
import { theme } from "../../global/styles/theme"

type BackgroundProps = {
    children: ReactNode
}

export function Background({ children }: BackgroundProps) {
    const { secondary100, secondary80 } = theme.colors
    return (
        <LinearGradient style={style.container} colors={[secondary80, secondary100]}>
            {children}
        </LinearGradient>
    )
}