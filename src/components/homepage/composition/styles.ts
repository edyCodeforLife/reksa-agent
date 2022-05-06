import {
    globalTextColorDefault, globalBorderColorSecondary,
    globalRedColor, globalGreenColor, lineBtn
} from '../../../data/global/variables';
import { StyleSheet } from 'aphrodite';

export const styles = StyleSheet.create({
    innerWhitePanel: {
        background: '#fff',
        padding: '36px 18px',
        marginBottom: 12,
        minHeight: 310
    },
    title: {
        color: globalTextColorDefault,
        fontSize: 24,
        margin: 0,
        fontWeight: 500,
        textAlign: 'left'
    },
    earningPotentionImageBox: {
        width: '70%',
        margin: '12px auto'
    },
    earningPotention: {
        background: '#fff',
        width: '90%',
        margin: '12px auto',
        padding: 12,
        color: globalTextColorDefault,
        fontSize: 18,
        textAlign: 'center',
        border: `1px solid ${globalBorderColorSecondary}`,
        borderRadius: 30,
        cursor: 'pointer',
        outline: 'none',
    },
    potentionBox: {
        minHeight: 308,
        position: 'relative',
        paddingLeft: 36,
        ':before': {
            content: '""',
            background: 'rgba(0,0,0,.12)',
            width: 1,
            left: 0,
            top: -6,
            position: 'absolute',
            height: 'calc(100% + 60px)'
        },
        ':after': {
            content: '""',
            background: '#fff',
            border: '1px solid rgba(0,0,0,.12)',
            width: 20,
            position: 'absolute',
            height: 20,
            top: 35,
            left: -10,
            transform: 'rotate(45deg)',
            borderBottom: 'none',
            borderLeft: 'none'
        }
    },
    averageDaily: {
        position: 'relative',
        textAlign: 'right',
        ':before': {
            content: '""',
            background: 'rgba(0,0,0,.12)',
            width: 1,
            left: -15,
            top: 0,
            position: 'absolute',
            height: '100%'
        },
    },
    grey: {
        color: '#999'
    },
    margintopbottom: {
        marginTop: 6
    },
    arrowUp: {
        color: globalGreenColor,
        marginRight: 6
    },
    arrowDown: {
        color: globalRedColor,
        marginRight: 6
    },
    totalGet: {
        position: 'absolute',
        bottom: 0,
        right: 12,
        width: 100,
        textAlign: 'right'
    },
    totalGetText: {
        lineHeight: '14px',
        marginBottom: 6,
    },
    totalGetPercentation: {
        fontSize: 24,
        fontWeight: 700
    },
    tableHead: {
        color: globalTextColorDefault,
        fontSize: 18,
        fontWeight: 500,
        padding: '14px 12px',
        textAlign: 'left',
        borderBottom: `1px solid rgba(0,0,0,.12)`,
        ':not(:last-child)': {
          borderRight: `1px solid rgba(0,0,0,.12)`
        },
        ':first-child': {
          paddingLeft: 30
        }
    },
    tableContent: {
        padding: '14px 12px',
        textAlign: 'left',
        borderBottom: `1px solid rgba(0,0,0,.12)`,
        position: 'relative',
        ':first-child': {
            width: 220
        },
        ':not(:last-child)': {
            borderRight: `1px solid rgba(0,0,0,.12)`
        },
        ':not(:last-child):not(:first-child)': {
            width: 50,
            textAlign: 'center'
        },
    },
    viewDetail: {
        position: 'absolute',
        right: 0,
        top: 14,
        fontSize: 12,
        color: '#aaa',
        cursor: 'pointer',
        outline: 'none'
    },
    pill: {
        width: 14,
        height: 10,
        content: '""',
        display: 'inline-block',
        borderRadius: 3,
        marginRight: 4
    },
    yellowPill: {
        background: '#FEC400',
    },
    greyPill: {
        background: '#E5EDF5',
    },
    bluePill: {
        background: '#034EA1',
    },
    greenPill: {
        background: '#29CB97',
    },
    lineBtn: lineBtn,
    extraLineBtnStyle: {
        width: '50%',
        margin: '36px auto 0',
        display: 'block'
    },
});