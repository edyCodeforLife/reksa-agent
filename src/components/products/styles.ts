import {
    globalBorderColorSecondary,
    globalButton,
    globalColorDefault, globalGreenColor,
    globalInnerSection, globalRedColor, globalSecondaryBtnBg, globalTextColorDefault, lineBtn
} from '../../data/global/variables';
import { StyleSheet } from 'aphrodite';

export const styles = StyleSheet.create({
    iconSort: {
        fontSize: 11,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    sortedLabel: {
        paddingLeft: 12,
        display: 'block'
    },
    innerSection: globalInnerSection,
    whitePanel: {
        background: '#fff',
        marginBottom: 12
    },

    whitePanelProduct: {
        background: '#fff',
        padding: '48px 36px',
        marginBottom: 24
    },

    searchBg: {
        backgroundColor: '#fff',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        minHeight: 10,
        padding: '18px 36px 12px',
        ':after': {
            background: 'url("/assets/product-icon/09_Base_Pattern_kiri.png")',
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 6,
            bottom: 12,
            width: 100,
            pointerEvents: 'none'
        },
        ':before': {
            background: 'url("/assets/product-icon/08_Base_Pattern_kanan.png")',
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 6,
            bottom: 12,
            width: 200,
            pointerEvents: 'none'
        }
    },
    searchIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
        color: '#999'
    },
    filterBox: {
        marginTop: 30
    },
    filterInputGroup: {
        display: 'flex',
        padding: '0 12px'
    },
    labelSearch: {
        color: globalTextColorDefault,
        fontWeight: 500,
        fontSize: 14,
        lineHeight: '36px',
        flex: 1,
        width: 100
    },
    selectFilter: {
        boxSizing: 'border-box',
        border: `1px solid #ddd`,
        background: '#fff',
        width: '100%',
        margin: '0 12px',
        padding: '8px 12px',
        paddingLeft: 24,
        borderRadius: 30,
        fontSize: 14,
    },
    headerItem: {
        userSelect: 'none',
        cursor: 'pointer',
        outline: 'none',
        fontWeight: 500,
        textAlign: 'left',
        position: 'relative',
        padding: 4,
        paddingTop: 8,
        paddingBottom: 8,
        ':not(:last-child)': {
            borderRight: '1px solid rgba(0,0,0,.12)',
        },
        borderBottom: '1px solid rgba(0,0,0,.42)',
    },
    dataItem: {
        textAlign: 'left',
        color: '#555',
        fontSize: 14,
        padding: 4,
        paddingTop: 18,
        paddingBottom: 18,
        ':not(:last-child)': {
            borderRight: '1px solid rgba(0,0,0,.12)',
        },
        borderBottom: '1px solid rgba(0,0,0,.12)',
    },
    productName: {
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        outline: 'none',
        flex: 1
    },
    productActionBox: {
        width: 177,
        textAlign: 'right'
    },
    btnBuy: {
        background: globalGreenColor,
        border: 'none',
        padding: '0 18px',
        borderRadius: 20,
        color: '#fff',
        marginLeft: 6,
        marginRight: 3,
        cursor: 'pointer',
        outline: 'none',
        fontWeight: 300,
        height: 30,
        lineHeight: '30px'
    },
    iconAction: {
        height: 14,
        margin: '0 6px 0 3px'
    },
    transparentBtn: {
        background: 'rgba(0,0,0,0)',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        padding: '0 3px'
    },
    iconActionBtn: {
        height: 30,
        verticalAlign: 'middle'
    },

    tooltipBtn: {
        position: 'relative',
        ':hover > span': {
            visibility: 'visible',
            opacity: 1
        }
    },
    tooltipText: {
        visibility: 'hidden',
        backgroundColor: '#fff',
        border: `1px solid ${globalTextColorDefault}`,
        textAlign: 'center',
        borderRadius: 8,
        padding: '5px 12px',
        position: 'absolute',
        zIndex: 1,
        bottom: '125%',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: 0,
        transition: 'opacity 0.3s',
        ':after': {
            content: '""',
            position: 'absolute',
            top: '100%',
            left: '50%',
            marginLeft: -5,
            borderWidth: 5,
            borderStyle: 'solid',
            borderColor: `${globalTextColorDefault} transparent transparent transparent`
        }
    },
    iconArrow: {
        height: 10,
        marginRight: 3
    },

    pagination: {
        border: '1px solid rgba(0,0,0,.12)',
        display: 'inline-block',
        height: 34,
        borderRadius: 20,
        paddingLeft: 6,
        paddingRight: 6
    },
    itemPagination: {
        display: 'inline-block',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 9,
        paddingBottom: 6,
        cursor: 'pointer',
        outline: 'none',
        opacity: .6,
        userSelect: 'none'
    },
    disabledPagination: {
        opacity: .6,
        cursor: 'initial'
    },
    paginationIcon: {
        padding: '0 0 0 12px',
        fontSize: 14
    },
    paginationIconLast: {
        padding: '1.5px 12px 1.5px 0',
        fontSize: 9
    },

    paginationIconLeft: {
        padding: '0 12px 0 0',
        fontSize: 14
    },
    paginationIconLastLeft: {
        padding: '1.5px 0 1.5px 12px',
        fontSize: 9
    },
    activePagination: {
        opacity: 1,
        borderBottom: `2px solid ${globalTextColorDefault}`
    },
    insideModalLarge: {
        minWidth: 800,
        maxWidth: '100%',
        width: 'auto',
        boxSizing: 'border-box',
        textAlign: 'left',
        padding: '24px 12px'
    },
    greyedText: {
        color: '#999',
        fontSize: 14,
        marginBottom: 6
    },
    blueText: {
        color: globalTextColorDefault,
        marginBottom: 18
    },
    horizontalLine: {
        height: 1,
        background: 'rgba(0,0,0,.12)',
        content: '""',
        marginTop: 6,
        marginBottom: 6,
        display: 'block'
    },
    tabTitleContainer: {
        paddingTop: 6,
        paddingBottom: 6
    },
    tabTitle: {
        padding: 12,
        paddingLeft: 36,
        paddingRight: 36,
        display: 'inline-block',
        color: '#999',
        cursor: 'pointer',
        outline: 'none',
        fontSize: 14,
        userSelect: 'none'
    },
    activeTab: {
        position: 'relative',
        color: globalTextColorDefault,
        background: globalSecondaryBtnBg,
        borderRadius: 15,
        ':after': {
            content: '""',
            position: 'absolute',
            width: 18,
            height: 18,
            border: '1px solid rgba(0,0,0,.12)',
            display: 'block',
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            bottom: -22,
            background: '#fff',
            borderLeft: 'none',
            borderTop: 'none'
        }
    },
    tabContentContainer: {
        marginTop: 12,
        marginBottom: 36,
        paddingLeft: 12,
        paddingRight: 12
    },
    blueBtn: globalButton,
    tabTitleText: {
        fontWeight: 300,
        color: globalTextColorDefault,
        fontSize: 20
    },
    groupedText: {
        paddingRight: 12,
        marginBottom: 24
    },
    moneyBg: {
        color: globalTextColorDefault,
        background: globalSecondaryBtnBg,
        padding: '6px 24px 6px 12px',
        borderColor: globalBorderColorSecondary,
        borderWidth: 1,
        borderStyle: 'solid',
        display: 'inline-block',
        fontSize: 20,
        borderRadius: 12
    },
    smallBlueText: {
        fontSize: 12,
        color: globalTextColorDefault,
        fontWeight: 500
    },
    downloadContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12
    },
    lineBtn: lineBtn,
    smallerLineBtn: {
        height: 30,
        lineHeight: '30px',
        padding: '0 24px',
        fontSize: 14,
        fontWeight: 500
    },
    tableHeaderPerformance: {
        fontSize: 12,
        padding: '6px 12px',
        ':not(:first-child)': {
            borderLeft: '1px solid rgba(0,0,0,.12)'
        },
        ':last-child': {
            borderRight: '1px solid rgba(0,0,0,.12)'
        },
        borderBottom: '1px solid rgba(0,0,0,.12)',
    },
    tablePerformance: {
        width: '100%',
        marginTop: 12,
        marginBottom: 24,
        borderSpacing: 0
    },
    titleTableRow: {
        fontSize: 16,
        paddingTop: 12,
        paddingBottom: 12,
        borderLeft: '1px solid rgba(0,0,0,.12)'
    },
    noBorderBottom2: {
        borderBottom: 'none'
    },
    redText: {
        color: globalRedColor
    },
    borderTableRow: {
        border: '1px solid rgba(0,0,0,.12)'
    },
    largerText: {
        fontSize: 14,
        marginTop: 6
    },
    borderLeft: {
        borderLeft: '1px solid rgba(0,0,0,.12)'
    },
    chartBox: {
        height: 300,
        width: '100%'
    },
    changeRangeBox: {
        position: 'absolute',
        zIndex: 2,
        right: 30,
        top: 12
    }
});