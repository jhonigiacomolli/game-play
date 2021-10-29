import React, { useEffect, useState } from "react"
import { ImageBackground, Text, View, FlatList, Alert, Share, Platform } from 'react-native'
import { Background } from '../../components/background';
import { Header } from "../../components/header"
import { ListHeader } from "../../components/list-header"
import { BorderlessButton } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons'
import { style } from './styles'
import { theme } from "../../global/styles/theme"
import BannerIMG from '../../assets/banner.png'
import { Member, MemberProps } from "../../components/member";
import { ListDivider } from "../../components/list-divider";
import { useRoute } from "@react-navigation/native";
import { Appointment } from "../../components/appointment";
import { api } from "../../services/api";
import { Loading } from "../../components/load/loading";
import * as Linking from 'expo-linking'
import { ButtonIcon } from "../../components/button-icon";

type RouteParams = {
    guildSelected: Appointment
}
type GuildWidget = {
    id: string
    name: string
    instant_invite: string
    members: MemberProps[]
    presence_count: number
}
export function AppointmentDetails() {
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget)
    const [loading, setLoading] = useState(true)
    const [members, setMembers] = useState()
    const route = useRoute()
    const { guildSelected } = route.params as RouteParams

    async function fetchGuildWidget() {
        try {
            const response = await api.get(`guilds/${guildSelected.guild.id}/widget.json`)
            setWidget(response.data)
        } catch {
            Alert.alert('Verifique as configurações do servidor, será que o widget esta habilitado?')
        } finally {
            setLoading(false)
        }
    }

    function handleShareInvitation() {
        const message = Platform.OS === 'ios' 
        ? `Junte-se a ${guildSelected.guild.name}`
        : widget.instant_invite

        try {
            Share.share({
                message,
                url: widget.instant_invite
            })
        }catch {
            Alert.alert('Você não possui permissão para compartilhar este servidor?')
        }
    }

    function handleOpenGuild() {
        Linking.openURL(widget.instant_invite)
    }

    useEffect(() => {
        fetchGuildWidget()
    }, [])

    return (
        <Background>
            <Header title="Detalhes" action={
                <BorderlessButton onPress={handleShareInvitation}>
                    <Fontisto name="share" size={24} color={theme.colors.primary} />
                </BorderlessButton>
            } />
            <ImageBackground source={BannerIMG} style={style.banner}>
                <View style={style.bannerContent}>
                    <Text style={style.title}>{ guildSelected.guild.name }</Text>
                    <Text style={style.subtitle}>{ guildSelected.description }</Text>
                </View>
            </ImageBackground>
            {
                loading 
                ? <Loading /> 
            : <> 
                <ListHeader title="Jogadores" subtitle={`Total ${widget.members.length}`} />
                <FlatList 
                    data={widget.members} 
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Member data={item} />
                    )}
                    ItemSeparatorComponent={() => <ListDivider isCentered/>}
                    style={style.members}
                />
            </>
            }
            {
                guildSelected.guild.owner && (
                    <View style={style.footer}>
                        <ButtonIcon 
                            title="Entrar na partida"
                            onPress={handleOpenGuild}
                        />
                    </View>
                )
            }
        </Background>
    )
}