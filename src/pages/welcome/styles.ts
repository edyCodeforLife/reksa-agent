import { globalInnerSection, globalPanelHead, globalPanelHeadTitle, globalPanelHeadTitleText,
    globalTextColorDefault
} from '../../data/global/variables';
import { StyleSheet } from 'aphrodite';

export const styles = StyleSheet.create({
    innerSection: globalInnerSection,
    panelHead: globalPanelHead,
    panelHeadTitle: globalPanelHeadTitle,
    panelHeadTitleText: globalPanelHeadTitleText,
    headerTitleLogo: {
        position: 'absolute',
        right: 48,
        top: '50%',
        transform: 'translateY(-50%)'
    },
    biggerTitle: {
        fontSize: 36,
        fontWeight: 300,
        marginTop: 12
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 100,
        margin: 0,
        color: '#fff',
        marginBottom: 12
    },
    innerWelcome: {
        padding: '100px 200px 0',
        textAlign: 'center',
        marginBottom: 36
    },
    questionText: {
        fontSize: 30
    },
    button: {
        color: globalTextColorDefault,
        padding: 24,
        width: 'calc(50% - 24px)',
        margin: '0 12px',
        fontSize: 24,
        borderRadius: 12,
        outline: 'none',
        cursor: 'pointer',
        background: '#F6FBFF',
        border: '1px solid #C1DFFF',
        display: 'inline-block',
        boxSizing: 'border-box',
        textDecoration: 'none'
    }
});