import {
    globalBorderColorSecondary,
    globalInnerSection, globalTextColorDefault
} from '../../data/global/variables';
import { StyleSheet } from 'aphrodite';

export const styles = StyleSheet.create({
    dropdown: {
        zIndex: 4
    },
    parent: {
        width: '100%',
        position: 'relative',
        paddingLeft: 0,
        paddingRight: 0,
        margin: 0
    },
    innerDropdown: {
        top: '100%',
        ':before': {
            right: 17
        }
    },
    caret: {
        position: 'absolute',
        right: 12,
        top: '38%',
    },
    dropdownItem: {
        padding: '12px 24px',
        minWidth: 150
    }
});