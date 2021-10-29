import React from "react"
import { View, Text } from 'react-native'
import { style } from './styles'

type ListHeaderProps = {
    title: string
    subtitle: string
}
export function ListHeader({ title, subtitle }: ListHeaderProps) {
    return (
        <View style={style.container}>
            <Text style={style.title}>
                { title }
            </Text>
            <Text style={style.subtitle}>
                { subtitle }
            </Text>
        </View>
    )
}