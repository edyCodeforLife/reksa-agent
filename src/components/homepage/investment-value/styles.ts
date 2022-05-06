import { lineBtn, globalTextColorDefault, globalBorderColorSecondary,
    globalSecondaryBtnBg, globalRedColor, globalGreenColor} from '../../../data/global/variables';
import { isMobile } from '../../../data/global/functions';
import { StyleSheet } from 'aphrodite';

let transitionsTime = isMobile() ? .1 : .5;

export const styles = StyleSheet.create({
    innerWhitePanel: {
        background: '#fff',
        padding: '36px 18px 30px',
        marginBottom: 12,
        minHeight: 170
    },
    lineBtn: lineBtn,
    extraLineBtnStyle: {
        width: '50%',
        margin: '30px auto 0',
        display: 'block'
    },
    title: {
        color: globalTextColorDefault,
        fontSize: 24,
        margin: 0,
        fontWeight: 500,
        textAlign: 'center'
    },
    earningPotentionImageBox: {
        width: '70%',
        margin: '12px auto'
    },
    earningPotention: {
        background: globalSecondaryBtnBg,
        width: '75%',
        margin: '12px auto',
        padding: 12,
        color: globalTextColorDefault,
        fontSize: 22,
        textAlign: 'center',
        border: `1px solid ${globalBorderColorSecondary}`,
        borderRadius: 10
    },
    potentionBox: {
        minHeight: 118,
        position: 'relative',
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
            bottom: 20,
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
    }
});