import { globalColorDefault, font300, globalTextColorDefault } from '../../../data/global/variables';
import { StyleSheet } from 'aphrodite';

export const styles = StyleSheet.create({
  footer: {
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 14,
  },
  grey: {
    color: '#999'
  },
  blue: {
    color: globalTextColorDefault,
    fontWeight: 700
  },
  right: {
    float: 'right',
    display: 'inline-block'
  },
  smallSupportedText: {
    textAlign: 'left',
    marginBottom: 6
  },
  supportedImagesItem: {
    height: 30,
    marginRight: 6
  },
  sectionContentFooter: {
    lineHeight: '50px'
  }
});