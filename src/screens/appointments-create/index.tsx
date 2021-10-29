import React, { useState } from "react"
import uuid from 'react-native-uuid'
import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { CategorySelect } from "../../components/category-select";
import { Header } from "../../components/header"
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { style } from './styles'
import { theme } from "../../global/styles/theme";
import { SmallInput } from "../../components/small-input";
import { TextArea } from "../../components/text-area";
import { Button } from "../../components/button";
import { ModalView } from "../../components/modal-view";
import { Guilds } from "../guilds";
import { GuildProps } from "../../components/guild";
import { GuildIcon } from "../../components/guild-icon";
import { Background } from "../../components/background";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../config/database";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function AppointmentCreate() {
    const [category, setCategory] = useState('')
    const [openGuildModal, setOpenGuildModal] = useState(false)
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps)
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [hour, setHour] = useState('')
    const [minute, setMinute] = useState('')
    const [description, setDescription] = useState('')
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>()

    function handleCategorySelect(categoryId: string) {
        setCategory(categoryId)
    }

    function handleOpenGuildModal() {
        setOpenGuildModal(true)
    }
    function handleCloseGuildModal() {
        setOpenGuildModal(false)
    }

    function handleGuildsSelected(guildSelected: GuildProps) {
        setGuild(guildSelected)
        handleCloseGuildModal()
    }

    async function handleSave() {
        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} ás ${hour}:${minute}h`,
            description,
        }
        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
        const appointemnts = storage ? JSON.parse(storage) : []

        await AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify([
            ...appointemnts,
            newAppointment
        ]))
        navigation.navigate('Home')
    }
    return (
        <KeyboardAvoidingView 
            behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}
            style={style.container}
        >
            <Background>
                <ScrollView>
                    <Header title="Agendar partida" />
                    <Text style={[ style.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 } ]}>
                        Categoria
                    </Text>
                    <CategorySelect 
                        hasCheckBox 
                        categorySelected={category}
                        setCategory={handleCategorySelect}
                    />
                    <View style={style.form}>
                        <RectButton onPress={handleOpenGuildModal}>
                            <View style={style.select}>
                                {
                                    guild.icon 
                                    ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> 
                                    : <View style={style.image} />
                                    
                                }
                                <View style={style.selectBody}>
                                    <Text style={style.label}>
                                    { 
                                        guild.name 
                                        ? guild.name 
                                        : 'Selecione um servidor'
                                    }
                                    </Text>
                                </View>
                                <Feather 
                                    name="chevron-right" 
                                    color={theme.colors.heading} 
                                    size={18} 
                                />
                            </View>
                        </RectButton>
                        <View style={style.field}>
                            <View>
                                <Text style={[style.label, { marginBottom: 12 }]}>Dia e mês</Text>
                                <View style={style.column}>
                                    <SmallInput maxLength={2} onChangeText={setDay} />
                                    <Text style={style.divider} >
                                        /
                                    </Text>
                                    <SmallInput maxLength={2} onChangeText={setMonth} />
                                </View>
                            </View>
                            <View>
                                <Text style={[style.label, { marginBottom: 12 }]}>Hora e minuto</Text>
                                <View style={style.column}>
                                    <SmallInput maxLength={2} onChangeText={setHour} />
                                    <Text style={style.divider}>
                                        :
                                    </Text>
                                    <SmallInput maxLength={2} onChangeText={setMinute} />
                                </View>
                            </View>
                        </View>
                        <View style={[ style.field, { marginBottom: 12 }]}>
                            <Text style={style.label}>Descrição</Text>
                            <Text style={style.charactersLimit}>Max 100 caracteres</Text>
                        </View>
                        <TextArea 
                            multiline
                            maxLength={100} 
                            numberOfLines={5}
                            autoCorrect={false} 
                            onChangeText={setDescription}
                        />
                        <View style={style.footer}>
                            <Button title="Agendar" onPress={handleSave} />
                        </View>
                    </View>
                </ScrollView>
            </Background>
            <ModalView visible={openGuildModal} closeModal={handleCloseGuildModal}>
                <Guilds setGuildSelected={handleGuildsSelected} />
            </ModalView>                       
        </KeyboardAvoidingView>
    )
}