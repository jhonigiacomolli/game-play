import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading,
    },
    span: {
        color: theme.colors.primary
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        color: theme.colors.highlight,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 30,
    },
    ok: {
        marginLeft: 5,
        borderRadius: 8,
        borderColor: theme.colors.secondary40,
        borderWidth: 1,
        color: theme.colors.heading,
        backgroundColor: theme.colors.primary,
        height: 55,
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    cancel: {
        marginRight: 5,
        borderWidth: 1,
        borderRadius: 8,
        color: theme.colors.heading,
        borderColor: theme.colors.secondary40,
        height: 55,
        textAlignVertical: 'center',
        textAlign: 'center'
    }
})