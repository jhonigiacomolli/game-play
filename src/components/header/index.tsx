import React, { ReactNode } from 'react'
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { style } from './styles'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { theme } from '../../global/styles/theme'
import { useNavigation } from '@react-navigation/native'

type HeaderProps = {
    title: string
    action?: ReactNode,
}
export function Header({ title, action }: HeaderProps) {
    const { secondary100, secondary40, heading } = theme.colors
    const navigation = useNavigation()

    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <LinearGradient colors={[ secondary100, secondary40 ]} style={style.container} >
            <BorderlessButton onPress={handleGoBack}>
                <Feather name="arrow-left" size={24} color={heading} />
            </BorderlessButton> 
            <Text style={style.title}>
                { title }
            </Text>
            {
                action 
                ? 
                    <View>
                        { action }
                    </View>
                
                : 
                    <View style={{ width: 24 }} />
            }
        </LinearGradient>
    )
}