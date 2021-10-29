import React, { useEffect, useState } from "react"
import { View, FlatList } from 'react-native'
import { Guild, GuildProps } from "../../components/guild"
import { ListDivider } from "../../components/list-divider"
import { style } from './styles'
import { Loading } from "../../components/load/loading"
import { api } from "../../services/api"

type GuildsProps =  {
    setGuildSelected: (guildSelected: GuildProps) => void
}
export function Guilds({ setGuildSelected }: GuildsProps) {
    const [guilds, setGuilds] = useState<GuildProps[]>([])
    const [loading, setLoading] = useState(true)

    async function fetchGuilds() {
        const response = await api.get('/users/@me/guilds')
        setGuilds(response.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchGuilds()
    }, [])
    return (
        <View style={style.container}>
            {
                loading 
                ? <Loading /> 
                : <FlatList 
                    style={style.guilds}
                    data={guilds}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Guild 
                            data={item}
                            onPress={() => setGuildSelected(item)} 
                        />
                    )}
                    ListHeaderComponent={() => <ListDivider isCentered />}
                    contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <ListDivider isCentered />}
                />
            }
        </View>
    )
}