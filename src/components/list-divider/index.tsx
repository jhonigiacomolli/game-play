import React from "react"
import { View } from 'react-native'
import { style } from './styles'

type ListDividerProps = {
    isCentered?: boolean
}
export function ListDivider({ isCentered }: ListDividerProps) {
    return (
        <View 
            style={[ 
                style.container, 
                isCentered 
                ? { marginVertical: 12 } 
                : { marginTop: 2, marginBottom: 31, } ]} 
        />
    )
}