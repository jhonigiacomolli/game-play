import React from "react"
import { Text } from 'react-native'
import { RectButton, RectButtonProps} from 'react-native-gesture-handler'
import { style } from "./styles"

type ButtonIconProps = RectButtonProps & {
    title: string
}
export function Button ({ title, ...rest }: ButtonIconProps) {
    return (
        <RectButton style={style.container} {...rest}>
            <Text style={style.title} >
                {title}
            </Text>
        </RectButton>
    )
}