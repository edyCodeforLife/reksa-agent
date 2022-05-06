import {
    globalColorDefault, font300, globalTextColorDefault,
    globalBorderColorSecondary, globalGreenColor, globalYellowColor, globalSecondaryBtnBg
} from '../../../data/global/variables';
import { isMobile } from '../../../data/global/functions';
import { StyleSheet } from 'aphrodite';

let transitionsTime = isMobile() ? .1 : .5;
const colorEnd = '#005099';
const colorStart = '#0B8FDE';

export const styles = StyleSheet.create({
    innerWhitePanel: {
        background: '#fff',
        padding: '36px 18px 30px',
        marginBottom: 12,
        minHeight: 170
    },
    title: {
        color: globalTextColorDefault,
        fontSize: 24,
        margin: 0,
        fontWeight: 500,
        textAlign: 'center'
    },
    balance: {
        fontSize: 32,
        marginTop: 8,
        marginBottom: 8,
        fontWeight: 500
    },
    up: {
        fontSize: 18,
        color: '#999',
        margin: '6px 0'
    },
    arrowUp: {
        color: globalGreenColor,
        marginRight: 6
    },

    withdrawButton: {
        margin: '30px auto 0',
        width: '60%',
        position: 'relative',
        boxShadow: '6px 6px 3px rgba(0,0,0,.07)',
        color: '#fff',
        padding: '0 24px',
        borderRadius: 30,
        lineHeight: '45px',
        cursor: 'pointer',
        outline: 'none',
        display: 'block',
        textDecoration: 'none',
        backgroundColor: colorEnd,
        background: `linear-gradient(135deg, ${colorStart} 0%,${colorEnd} 100%)`,
        filter: `progid:DXImageTransform.Microsoft.gradient(startColorstr="${colorStart}", endColorstr="${colorEnd}",GradientType=1)`
    },
    rightCircleBox: {
        display: 'inline-block',
        position: 'absolute',
        right: 6,
        border: '1px solid #fff',
        width: 26,
        height: 26,
        top: 8,
        textAlign: 'center',
        borderRadius: 41
    },
    rightCircleIcon: {
        color: '#fff',
        verticalAlign: 'top',
        marginTop: 5
    },
    separator: {
        borderColor: 'rgba(0,0,0,.1)',
        borderWidth: 1.5,
        borderTop: 'none'
    },
    meterBox: {
        marginTop: 24,
        marginBottom: 24
    },
    meterContainer: {
        marginTop: 12,
        background: 'rgba(0,0,0,.12)',
        height: 10,
        borderRadius: 10,
        position: 'relative'
    },
    meterFill: {
        height:10,
        borderRadius: 10,
        display: 'inline-block',
        position: 'absolute',
        top: 0,
        left: 0,
        '-webkit-transition': 'width 1s ease-in-out',
        '-moz-transition': 'width 1s ease-in-out',
        '-o-transition': 'width 1s ease-in-out',
        transition: 'width 1s ease-in-out',
    },

    meterFillGreen: {
        backgroundColor: globalGreenColor,
    },

    meterFillYellow: {
        backgroundColor: globalYellowColor,
    },
    blueRoundedBox: {
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
});