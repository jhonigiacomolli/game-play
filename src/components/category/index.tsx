import React from "react"
import { Text, View } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { RectButton, RectButtonProps } from "react-native-gesture-handler"
import { LinearGradient } from "expo-linear-gradient"
import { theme } from "../../global/styles/theme"
import { style } from "./styles"

type CategoryProps = RectButtonProps & {
    title: string
    Icon: React.FC<SvgProps>
    checked: boolean
    hasCheckBox?: boolean
}
export function Category ({ title, Icon, checked = false, hasCheckBox = false, ...rest }: CategoryProps) {
    const { secondary75, secondary70, secondary50, secondary40 } = theme.colors
    return (
        <RectButton
            {...rest}
        >
            <LinearGradient style={style.container} colors={[secondary50, secondary70]}>
                <LinearGradient style={[style.content, { opacity: checked ? 1 : 0.5 }]} 
                colors={[ checked ? secondary75 : secondary50, secondary40]}>
                    {hasCheckBox && <View style={checked ? style.checked : style.check} />} 
                    <Icon width={48} height={48} />  
                    <Text style={style.title}>
                        { title }
                    </Text> 
                </LinearGradient>
            </LinearGradient>
        </RectButton>
    )
}