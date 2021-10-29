import React, { useState } from "react"
import { TextInput, TextInputProps } from 'react-native'
import { style } from './styles'

export function TextArea ({ ...rest }: TextInputProps) {
    return (
        <TextInput style={style.container} {...rest} />
    )
}