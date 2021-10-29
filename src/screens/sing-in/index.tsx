import React, { useState } from 'react'
import { 
    View, 
    Text, 
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native' 
import { Style } from './styles'
import illustration from '../../assets/illustration.png'
import { Background } from '../../components/background';
import { ButtonIcon } from '../../components/button-icon'
import { useAuth } from '../../hooks/auth'
import { theme } from '../../global/styles/theme';


export function SignIn() {
    const { loading, signIn } = useAuth()
    async function handleSigIn () {
        try {
            await signIn()
        }catch (error) {
            throw new Error('Não foi possível autenticar')
        }
    }

    return (
        <Background>
            <View style={Style.container}>
                <Image 
                    source={illustration} 
                    style={Style.image} 
                    resizeMode="stretch"
                />
                <View style={Style.content}>
                    <Text style={Style.title}>
                        Conecte-se e {'\n'} 
                        organize suas {'\n'}
                        jogatinas 
                    </Text>
                    <Text style={Style.subtitle}>
                        Crie grupos para jogar seus games {'\n'} 
                        favoritos com seus amigos
                    </Text>
                    {
                        loading 
                        ? <ActivityIndicator color={theme.colors.primary} />
                        : <ButtonIcon title="Entrar com Discord" onPress={handleSigIn}/>
                    }
                </View>
            </View>
        </Background>
    )
}