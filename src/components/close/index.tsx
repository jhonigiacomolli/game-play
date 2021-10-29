import React, { ReactNode } from "react"
import { Text, View, TouchableOpacity } from 'react-native'
import { RectButton } from "react-native-gesture-handler"
import { useAuth } from "../../hooks/auth"
import { style } from './styles'

type CloseProps = {
    closeModal: () => void
}
export function Close({ closeModal }: CloseProps) {
    const { signOut } = useAuth()

    return (
        <View style={style.container}>
            <Text style={style.title}>
                Deseja sair do Game
                <Text style={style.span}>Play</Text>
                ?
            </Text>
            <View style={style.buttonContainer}>
                <TouchableOpacity style={style.button} activeOpacity={0.7} onPress={closeModal}>
                    <Text style={style.cancel}>
                        Não
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.button} activeOpacity={0.7}onPress={() => signOut()}>
                    <Text style={style.ok}>
                        Sim
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}