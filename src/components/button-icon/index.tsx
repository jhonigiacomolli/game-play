import React from "react"
import { Text, Image, View } from 'react-native'
import { RectButton, RectButtonProps} from 'react-native-gesture-handler'

import discordimg from '../../assets/discord.png'
import { style } from "./styles"

type ButtonIconProps = RectButtonProps & {
    title: string
}
export function ButtonIcon ({ title, ...rest }: ButtonIconProps) {
    return (
        <RectButton style={style.container} {...rest}>
            <View style={style.iconWrapper}>
                <Image source={discordimg} style={style.icon} />
            </View>
            <Text style={style.title} >
                {title}
            </Text>
        </RectButton>
    )
}