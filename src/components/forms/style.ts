import { StyleSheet } from 'aphrodite';

import {globalColorDefault, globalTextColorDefault} from '../../data/global/variables';

const topLabel = {
    top: -14,
    fontSize: 12,
    color: "#333"
};

export const styles = StyleSheet.create({
    dropdown: {
        paddingRight: 36,
        boxSizing: 'border-box',
        textOverflow: 'ellipsis'
    },
    default: {
        background: 'none',
        fontWeight: 'normal',
        color: '#555',
        fontSize: 18,
        padding: '10px 0',
        display: 'block',
        width: '100%',
        border: 'none',
        borderRadius: 0,
        borderBottom: '1px solid #c6c6c6',
        boxShadow: 'none',
        ':focus': {
            outline: 'none'
        },
        ':focus ~ label:not(.large)': topLabel,
        ':not(.is-empty) ~ label:not(.large)': topLabel,
        ':focus ~ label.large': {
            fontSize: 16,
            color: "#333"
        },
        ':not(.is-empty) ~ label.large': {
            fontSize: 16,
            color: "#333"
        },
        ':focus ~ .bar:before': {
            width: '100%'
        },
        ':disabled': {
            borderBottomStyle: 'dashed',
            opacity: .44
        },
        ':disabled  ~ label': {
            opacity: .44,
        },
    },
    disabledField: {
        opacity: .44,
        cursor: 'default'
    },
    defaultLabel: {
        color: '#c6c6c6',
        fontSize: 14,
        fontWeight: 'normal',
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: 10
    },
    bar: {
        position: 'relative',
        display: 'block',
        width: '100%',
        ':before': {
            content: '""',
            height: 2,
            width: 0,
            bottom: 0,
            position: 'absolute',
            background: globalColorDefault,
            WebkitTransition: '300ms ease all',
            transition: '300ms ease all',
            left: '0%'
        }
    },
    inputPassword: {
        letterSpacing: '0.3em'
    },
    errorLabel: {
        fontSize: 11,
        color: '#ff1133'
    },
    infoLabel: {
        fontSize: 11,
        color: globalTextColorDefault,
        fontWeight: 700
    },
    infoGrey: {
        color: '#999'
    },
    errorBar: {
        borderColor: '#ff1133',
        borderWidth: 2
    },
    group: {
        position: 'relative',
        margin: '24px 0',
        width: '100%'
    },
    fileGroup: {
        margin: '24px 0 6px',
    },
    checboxGroup: {
        marginTop: 0
    },
    dropdownContainer: {
        position: 'relative'
    },
    caretDown: {
        position: 'absolute',
        right: 12,
        top: 12,
        pointerEvents: 'none'
    },
    dropdownList: {
        position: 'absolute',
        right: 0,
        top: 41,
        left: 0,
        backgroundColor: '#fff',
        zIndex: 3,
        boxShadow: '-1px 3px 8px #ddd',
        maxHeight: 200,
        overflow: 'auto'
    },
    caretLarge: {
        top: 50,
    },
    dropdownItem: {
        padding: '12px 24px',
        borderBottom: '1px solid rgba(0,0,0,.12)',
        cursor: 'pointer',
        outline: 'none',
        // ':hover': {
        //     backgroundColor: 'rgba(0,0,0,.03)'
        // }
    },
    dropdownHover: {
        backgroundColor: 'rgba(0,0,0,.03)'
    },
    inlineLabel: {
        display: 'inline-block',
        fontSize: 16,
        verticalAlign: 'top',
        marginTop: 20,
        cursor: 'pointer',
        outline: 'none',
    },
    checkOrRadioIcon: {
        fontSize: 24,
        marginRight: 12
    },
    checkOrRadioContainer: {
        display: 'inline-block',
        marginTop: 16,
        cursor: 'pointer',
        outline: 'none',
    },
    prevDisabled: {
        opacity: .7
    },
    large: {
        padding: '52px 12px 10px 0'
    },
    fileBtn: {
        width: "100%",
        verticalAlign: "top",
        border: "1px solid rgba(0,0,0,.12)",
        padding: "8px 12px",
        background: "rgba(0,0,0,.12)",
        borderRadius: 20,
        marginTop: 32,
        cursor: "pointer",
        outline: "none",
        fontSize: 12,
        ':disabled': {
            cursor: 'default',
            opacity: .44
        }
    },
    realInputFile: {
        height: 0,
        width: 0,
        opacity: 0
    },
    previewBox: {
        textAlign: "left",
        position: 'relative',
        display: 'inline-block',
        marginBottom: 18
    },
    previewImg: {
        height: 80,
        border: `1px solid rgba(24, 50, 171, .3)`,
        borderRadius: 20
    },
    btnFileReset: {
        position: 'absolute',
        top: 0,
        right: 0,
        border: `1px solid ${globalColorDefault}`,
        borderRadius: 30,
        fontSize: 12,
        color: globalColorDefault,
        height: 25,
        width: 25,
        textAlign: 'center',
        cursor: "pointer",
        outline: "none",
    },
    insideModal: {
        padding: 24
    },
    iconPdfPreview: {
        fontSize: 70
    },
    iconWarning: {
        fontSize: 36,
        color: '#B33A3A'
    },
    warningText: {
        verticalAlign: 'top',
        marginTop: 12,
        display: 'inline-block',
        marginLeft: 12
    }
});
