import React, { useState } from "react"
import { TouchableOpacity, TouchableOpacityProps, View, Text} from 'react-native'
import { style } from './styles'
import { Feather } from '@expo/vector-icons'
import { GuildIcon } from "../guild-icon"
import { theme } from "../../global/styles/theme"

export type GuildProps = {
    id: string
    name: string
    icon: string | null
    owner: boolean
}
type Props = TouchableOpacityProps & {
    data: GuildProps
}
export function Guild({ data, ...rest } : Props) {
    return (
        <TouchableOpacity style={style.container} activeOpacity={0.7} {...rest}>
            <GuildIcon guildId={data.id} iconId={data.icon} />
            <View>
                <View style={style.content}>
                    <Text style={style.title}>
                        { data.name }
                    </Text>
                    <Text style={style.type}>
                        { data.owner ? 'Administrador' : 'Convidado' }
                    </Text>
                </View>
            </View>
            <Feather 
                size={24} 
                name="chevron-right" 
                color={theme.colors.heading} 
            />
        </TouchableOpacity>
    )
}