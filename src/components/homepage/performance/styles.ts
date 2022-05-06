import {
    blueBtnGradient, blueBtnGradientRightCircleBox, blueBtnGradientRightCircleIcon,
    globalTextColorDefault, lineBtn
} from '../../../data/global/variables';
import { StyleSheet } from 'aphrodite';

export const styles = StyleSheet.create({
    innerWhitePanel: {
        background: '#fff',
        padding: '36px 18px',
        marginBottom: 12,
        minHeight: 320
    },
    title: {
        color: globalTextColorDefault,
        fontSize: 24,
        margin: 0,
        fontWeight: 500,
        textAlign: 'left'
    },
    potentionBox: {
        minHeight: 338,
        position: 'relative',
        paddingLeft: 36,
        ':before': {
            content: '""',
            background: 'rgba(0,0,0,.12)',
            width: 1,
            left: -6,
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
            left: -16,
            transform: 'rotate(45deg)',
            borderBottom: 'none',
            borderLeft: 'none'
        }
    },
    financialPlaneNoneBox: {
        textAlign: 'center',
        width: '80%',
        margin: '0 auto'
    },
    financialPlaneNoneText: {
        fontSize: 18,
        marginTop: 0
    },

    financialPlanBox: {
        marginRight: 12
    },
    blueGradientBtn: blueBtnGradient,
    rightCircleBox: blueBtnGradientRightCircleBox,
    rightCircleIcon: blueBtnGradientRightCircleIcon,
    lineBtn: lineBtn,
    extraLineBtn: {
        margin: '12px 0',
        padding: '0 24px'
    }
});