import React from "react"
import { ScrollView } from 'react-native'
import { categories } from "../../utils/categories"
import { Category } from "../category"
import { style } from "./styles"

type CategorySelectProps = {
    categorySelected: string
    setCategory: (categoryId: string) => void
    hasCheckBox?: boolean
}
export function CategorySelect({ categorySelected, hasCheckBox = false, setCategory }: CategorySelectProps) {
    return (
        <ScrollView 
            style={style.container} 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 40 }}
        >
            {
                categories.map(category => (
                    <Category
                        key={category.id}
                        title={category.title}
                        Icon={category.icon}
                        checked={category.id === categorySelected}
                        onPress={() => setCategory(category.id)}
                        hasCheckBox={hasCheckBox}
                    />
                ))
            }

        </ScrollView>
    )
}