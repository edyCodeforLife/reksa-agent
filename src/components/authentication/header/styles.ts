import { StyleSheet } from 'aphrodite';
import {
    globalTextColorDefault, insideModal, lineBtn, logoBox, logoIcon, globalButton, warningLogoBox
} from '../../../data/global/variables';

export const myStyles = StyleSheet.create({
    menuItem: {
        display: 'inline-block',
        paddingLeft: 24,
        paddingRight: 24,
        cursor: 'pointer',
        outline: 'none',
        fontSize: 18,
        fontWeight: 500,
        userSelect: 'none',
    },
    lineBtn: lineBtn,
    blueText: {
        color: globalTextColorDefault
    },
    caretDown: {
        marginLeft: 12,
        top: -4,
        position: 'relative',
        content: '""',
        display: 'inline-block',
        width: 0,
        height: 0,
        border: '3px solid #555',
        transform: 'rotate(45deg)',
        ':after': {
            position: 'absolute',
            left: -10,
            bottom: -1,
            content: '""',
            background: '#fff',
            display: 'inline-block',
            width: 12,
            height: 12,
            transform: 'rotate(45deg)',
        }
    },
    caretUp: {
        top: 0,
        ':after': {
            top: 0,
            left: -3
        }
    },
    dropdown: {
        position: 'relative',
        background: '#fff',
        zIndex: 2,
        ':before': {
            position: 'fixed',
            content: '""',
            background: 'rgba(3,78,161,.28)',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    },
    innerDropdown: {
        background: '#fff',
        zIndex: 2,
        position: 'absolute',
        right: -12,
        top: 12,
        boxShadow: '0 2px 10px rgba(0,0,0,.32)',
        ':before': {
            content: '""',
            background: '#fff',
            width: 20,
            height: 20,
            display: 'block',
            position: 'absolute',
            top: -10,
            right: 29,
            transform: 'rotate(45deg)',
        }
    },
    menuItemDropdown: {
        padding: '12px 72px',
        fontSize: 16,
        cursor: 'pointer',
        outline: 'none',
        userSelect: 'none',
        position: 'relative',
        ':not(:last-child)': {
            borderBottom: '1px solid rgba(0,0,0,.12)'
        }
    },
    menuBox: {
        position: 'relative',
        display: 'inline-block'
    },
    iconMenuDropdown: {
        position: 'absolute',
        left: 24,
        top: 14
    },
    insideModal: insideModal,
    logoBox: logoBox,
    warningLogoBox: warningLogoBox,
    blueRoundedBox: lineBtn,
    checkSuccess: logoIcon,
    textBox: {
        margin: '24px 0'
    },
    secondaryBtn: lineBtn,
    blueBtn: globalButton,
    longItem: {
        minWidth: 100,
        textAlign: 'left'
    }
});
