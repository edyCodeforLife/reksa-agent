import { globalColorDefault, font300, globalTextColorDefault, globalBorderColorSecondary } from '../../../data/global/variables';
import { isMobile } from '../../../data/global/functions';
import { StyleSheet } from 'aphrodite';

let transitionsTime = isMobile()?.1:.5;

export const styles = StyleSheet.create({
    headerBg: {
        // backgroundColor: globalColorDefault,
        transition: `all ${transitionsTime}s ease-in-out`,
        height: 80,
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 3
    },
    authenticationBg: {
        background: '#fff',
        boxShadow: '0px 0px 11px #ccc'
    },
    logoContainer: {
        backgroundColor: '#fff',
        width: 40,
        height: 40,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
        display: 'inline-block'
    },
    logoIcon: {
        height: 24,
        left: 1,
        position: 'absolute',
    },
    innerIconBlock: {
        height: 30,
        width: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    logoName: {
        height: 24,
        verticalAlign: 'top',
        margin: '8px 12px'
    },
    logoNameAuthentcation: {
        height: 50,
        verticalAlign: 'top',
        margin: '8px 0'
    },
    alignRight: {
        textAlign: 'right'
    },
    headerMenuItem: {
        display: 'inline-block',
        fontSize: 18,
        lineHeight: '80px',
        padding: '0 18px',
        color: '#fff',
        cursor: 'pointer',
        '@media only screen and (max-width: 767px)': {
            display: 'none'
        }
    },
    placeholderFlag: {
        padding: '0 0 0 12px',
        display: 'inline-block',
        lineHeight: '80px',
        cursor: 'pointer',
        outline: 'none',
        '@media only screen and (max-width: 767px)': {
            paddingRight: 12
        }
    },
    flag: {
        verticalAlign: 'middle',
        marginTop: -4,
        height: 24
    },
    langContainer: {
        position: 'absolute',
        right: 0,
        width: 200,
        top: 60,
        backgroundColor: '#fff',
        textAlign: 'left',
        border: '1px solid rgba(0,0,0,.12)',
        display: 'none'
    },
    showLangContainer: {
        display: 'block'
    },
    langItem: {
        padding: '8px 12px',
        cursor: 'pointer',
        outline: 'none',
        ':not(:last-child)': {
            borderBottom: '1px solid rgba(0,0,0,.12)'
        },
        ':hover': {
            backgroundColor: 'rgba(0,0,0,.05)'
        }
    },
    flagSSmall: {
        height: 18,
        verticalAlign: 'middle',
        marginRight: 3
    },
    button: {
        fontWeight: 300,
        backgroundColor: 'transparent',
        border: '1px solid #fff',
        color: '#fff',
        padding: '8px 24px',
        borderRadius: 20,
        fontSize: 16,
        cursor: 'pointer',
        outline: 'none',
        textDecoration: 'none',
        ':last-child': {
            marginLeft: 6
        }
    },
    btnIcon: {
        fontSize: 16,
        marginRight: 6
    },

    logoWithoutName: {
        width: 50,
        overflow: 'hidden',
        display: 'inline-block'
    },
    menuBox: {
        display: 'inline-block',
        paddingLeft: 48,
        verticalAlign: 'top'
    },
    menuItem: {
        display: 'inline-block',
        padding: '0 18px'
    },
    menuItemLink: {
        lineHeight: '80px',
        textDecoration: 'none',
        color: '#999',
        fontSize: 18,
        fontWeight: 500,
        display: 'block'
    },
    menuItemLinkActive: {
        color: '#333',
        lineHeight: '76px',
        borderBottom: `4px solid ${globalColorDefault}`
    },
    menuItemGoalLinkActive: {
        position: 'relative',
        ':after': {
            content: '""',
            borderBottom: `4px solid ${globalColorDefault}`,
            position: 'absolute',
            display: 'block',
            width: '100%',
            left: 0,
            bottom: -22
        }
    },
    goalBtn: {
        color: globalTextColorDefault,
        padding: '8px 24px',
        lineHeight: '24px',
        border: `1px solid ${globalBorderColorSecondary}`,
        borderRadius: 12
    },
    blueText: {
        color: globalTextColorDefault
    },
    circleIcon: {
        width: 40,
        height: 40,
        display: 'inline-block',
        // border: '1px solid #f6f6f6',
        borderRadius: 40,
        verticalAlign: 'middle',
        marginTop: 0,
        marginRight: 12,
        cursor: 'pointer',
        outline: 'none',
        textAlign: 'center',
        position: 'relative'
    },
    circleIconInside: {
        height: 22,
        marginTop: 8
    },
    redDot: {
        content: '" "',
        width: 10,
        height: 10,
        borderRadius: 10,
        background: '#F44336',
        display: 'block',
        position: 'absolute',
        right: 6,
        top: 8
    }
})
