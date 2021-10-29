import React, { useState } from "react"
import { Text, View } from 'react-native'
import { Background } from '../../components/background';
import { CategorySelect } from "../../components/category-select";
import { TextInput, TextInputProps } from 'react-native'
import { style } from './styles'
import { theme } from "../../global/styles/theme";

export function SmallInput ({ ...rest }: TextInputProps) {
    return (
        <TextInput style={style.container} keyboardType="numeric"  {...rest} />
    )
}