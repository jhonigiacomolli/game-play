import React, { ReactNode } from "react"
import { Modal, ModalProps, TouchableWithoutFeedback, View } from 'react-native'
import { Background } from "../background"
import { style } from './styles'

type ModalViewProps = ModalProps & {
    children: ReactNode
    top?: number
    displayBar?: boolean
    autoClose?: boolean
    closeModal: () => void
}
export function ModalView({ children, top = 100, closeModal, displayBar = true, autoClose = true, ...rest }: ModalViewProps) {
    return (
        <Modal 
            transparent 
            animationType="slide" 
            statusBarTranslucent 
            { ... rest } 
        >
            {
                autoClose 
                ? <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={style.overlay} >
                        <View style={[style.container, { marginTop: top }]} >
                            <Background>
                                {displayBar && <View style={style.bar} />}
                                { children }
                            </Background>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                : <View style={style.overlay} >
                    <View style={[style.container, { marginTop: top }]} >
                        <Background>
                            {displayBar && <View style={style.bar} />}
                            { children }
                        </Background>
                    </View>
                </View>
            }
        </Modal>
    )
}