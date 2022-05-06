import { StyleSheet } from 'aphrodite';
import {globalColorDefault, globalRedColor, globalTextColorDefault} from '../../data/global/variables';

export const styles = StyleSheet.create({
    errorText: {
        color: globalRedColor
    },
    container: {
        marginTop: 60,
        marginBottom: -24
    },
    title: {
        fontWeight: 300
    },
    signatureBox: {
        border: '1px solid rgba(0,0,0,.12)',
        minHeight: 250,
        borderRadius: 5,
        position: 'relative',
        padding: 1
    },
    clearSignature: {
        border: `1px solid rgba(0,0,0,.12)`,
        width: 30,
        height: 30,
        borderRadius: 30,
        position: 'absolute',
        right: 6,
        top: 6,
        lineHeight: '30px',
        textAlign: 'center',
        color: globalTextColorDefault,
        cursor: 'pointer',
        outline: 'none',
        userSelect: 'none'
    },
    masking: {
        position: 'absolute',
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
        background: 'rgba(255,255,255,.12)',
        zIndex: 1
    }
});