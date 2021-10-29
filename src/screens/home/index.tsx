import React, { useState, useCallback } from "react"
import { View, FlatList } from 'react-native'
import { Appointment, Appointments } from "../../components/appointment"
import { ButtonAdd } from "../../components/button-add"
import { CategorySelect } from "../../components/category-select"
import { ListHeader } from "../../components/list-header"
import { Profile } from "../../components/profile"
import { ListDivider } from "../../components/list-divider"
import { Background } from '../../components/background';
import { style } from './styles'
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { COLLECTION_APPOINTMENTS } from "../../config/database"
import { Loading } from "../../components/load/loading"
import { ModalView } from "../../components/modal-view"
import { Close } from "../../components/close"
import { useAuth } from "../../hooks/auth"

export function Home() {
    const { signOut } = useAuth()
    const [category, setCategory] = useState('')
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>()
    const [appointments, setAppoiintments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState(true)
    const [closeModal, setCloseModal] = useState(true)

    function handleCategorySelect(categoryId: string) {
        categoryId === category  ? setCategory('') : setCategory(categoryId)
    }

    function handleAppointmentsDetails(guildSelected: Appointment) {
        navigation.navigate('AppointmentDetails', { guildSelected })
    }
    
    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate')
    }

    async function loadAppointments() {
        const response =await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
        const storage:Appointment[] = response ? JSON.parse(response) : []

        if(category) {
            setAppoiintments(storage.filter(item => item.category == category))
        }else {
            setAppoiintments(storage)
        }
        setLoading(false)
    }

    function handleCloseModal() {
        setCloseModal(false)
    }
    function handleOpenModal() {
        setCloseModal(true)
    }

    useFocusEffect(useCallback(() => {
        loadAppointments()
    }, [category]))

    return (
        <Background>
            <View style={style.header}>
                <Profile openModal={handleOpenModal} />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>
            <CategorySelect 
                categorySelected={category}
                setCategory={handleCategorySelect}
            />
            {
                loading 
                ? <Loading /> 
                : <>
                    <ListHeader title="Partidas agendadas" subtitle={`Total ${appointments.length}`}/>
                    <FlatList 
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Appointments data={item} onPress={() => handleAppointmentsDetails(item)} />
                        )}
                        contentContainerStyle={{ paddingBottom: 69 }}
                        style={style.matches}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <ListDivider />}
                    />
                </>
            }
            <ModalView visible={closeModal} closeModal={handleCloseModal} top={550} displayBar={false} autoClose={false}>
                <Close closeModal={handleCloseModal} />
            </ModalView>
        </Background>
    )
}