import React, { ReactNode } from "react"
import { View, Text } from 'react-native'
import { style } from './styles'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { GuildIcon } from "../guild-icon"
import { categories } from "../../utils/categories"
import PlayerSVG from '../../assets/player.svg'
import CalendarSVG from '../../assets/calendar.svg'
import { theme } from "../../global/styles/theme"
import { GuildProps } from "../guild"
import { LinearGradient } from "expo-linear-gradient"

export type Appointment = {
    id: string
    guild: GuildProps
    category: string
    date: string
    description: string
}
type AppointmentProps = RectButtonProps & {
    data: Appointment
}
export function Appointments({ data, ...rest }:AppointmentProps) {
    const [ category ] = categories.filter(item => item.id === data.category)
    const { owner } = data.guild
    const { primary, on, secondary70, secondary50 } = theme.colors

    return (
        <RectButton {...rest}>
            <View style={style.container}>
                <LinearGradient 
                    style={style.guildIconContainer} 
                    colors={[secondary50, secondary70]}
                >
                    <GuildIcon iconId={data.guild.icon} guildId={data.guild.id} />
                </LinearGradient>
                <View style={style.content}>
                    <View style={style.header}>
                        <Text style={style.title}>
                            { data.guild.name }
                        </Text>
                        <Text style={style.category}>
                            { category.title }
                        </Text>
                    </View>
                    <View style={style.footer}>
                        <View style={style.dateInfo}>
                            <CalendarSVG />
                            <Text style={style.date}>
                                { data.date }
                            </Text>
                        </View>
                        <View style={style.playersInfo}>
                            <PlayerSVG fill={ owner ? primary : on }/>
                            <Text style={[ style.player, {  color: owner ? primary : on }]}>
                                {owner ? 'Anfitrião' : 'Visitante'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </RectButton>
    )
}