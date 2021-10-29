import React from "react"
import { View, Text, Alert } from 'react-native'
import { style } from './styles'
import { Avatar } from '../avatar'
import { RectButton } from "react-native-gesture-handler"
import { useAuth } from "../../hooks/auth"

type ProfileProps = {
    openModal?: () => void
}
export function Profile({ openModal }: ProfileProps) {
    const { user } = useAuth()
    return (
        <View style={style.container}>
            <RectButton onPress={openModal}>
                <Avatar urlImage={user.avatar} />
            </RectButton>
            <View>
                <View style={style.user}>
                    <Text style={style.greeting}>
                        Olá,
                    </Text>
                    <Text style={style.username}>
                        { user.firstName }
                    </Text>
                </View>
                <Text style={style.message}>
                    Hoje é dia de vitória
                </Text>
            </View>
        </View>
    )
}