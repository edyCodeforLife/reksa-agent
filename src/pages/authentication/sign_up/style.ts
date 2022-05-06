import { globalColorDefault, globalButton } from '../../../data/global/variables';
import { isMobile } from '../../../data/global/functions';
import { StyleSheet } from 'aphrodite';

export const styles = StyleSheet.create({
    innerContent: {
        padding: '50px 100px'
    },
    title: {
        fontWeight: 500,
        fontSize: 28,
        color: '#555'
    },
    button: globalButton,
    orLabel: {
        margin: '24px 0',
        fontSize: 16,
        padding: 12,
        position: 'relative',
        background: '#fff',
        boxSizing: 'border-box',
        ':before': {
            display: 'block',
            content: '""',
            height: 1,
            width: '100%',
            background: 'rgba(0,0,0,.32)',
            position: 'absolute',
            top: 22,
            left: 0
        },
    },
    span: {
        background:' rgb(255, 255, 255)',
        position: 'absolute',
        top: 23,
        padding: '12px 24px',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    haveAccount: {
        margin: 24
    },
    checkbox: {
        cursor: 'pointer',
        outline: 'none',
        position: 'relative'
    },
    checkboxIcon: {
        fontSize: 24,
        position: 'absolute',
        left: 0,
        top: 12
    }
})
