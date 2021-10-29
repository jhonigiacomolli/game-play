import React from "react"
import { Image, View } from 'react-native'
import { style } from './styles'
import { CDN_IMAGE } from "../../config"
import DiscordSVG from '../../assets/discord.svg'

type Props = {
    guildId: string
    iconId: string | null
}
export function GuildIcon({ guildId, iconId }: Props) {
    const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`
    return (
        <View style={style.container}>
            {
                iconId 
                ?
                <Image 
                    style={style.image} 
                    source={{ uri: uri }} 
                    resizeMode="cover"
                />
                : 
                <DiscordSVG width={40} height={40} />
            }
        </View>
    )
}