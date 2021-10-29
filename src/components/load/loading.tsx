import React from "react"
import { ActivityIndicator, View } from 'react-native'
import { theme } from "../../global/styles/theme"
import { style } from './styles'

type Props = {

}
export function Loading() {
    return (
        <View style={style.container}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
    )
}