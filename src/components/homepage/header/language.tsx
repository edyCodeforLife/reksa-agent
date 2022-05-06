import * as React from 'react';
import { css } from 'aphrodite';
import { styles } from './style';

export class Language extends React.PureComponent<any, any> {
  element: any = null;
  showLanguage: boolean = false;

  constructor(props: any) {
    super(props);

    this.state = {
      showLanguage: false,
      country: {idn: 'id', en: 'gb' }
    }

    this.doShowLanguage = this.doShowLanguage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  doShowLanguage() {
    this.showLanguage = !this.showLanguage;
    let _display = 'display: none !important';
    if (this.showLanguage) _display = 'display: block !important';

    this.element.style.cssText = _display;
  }

  onChange(lang: any) {
    this.doShowLanguage();
    this.props.onChange(lang);
  }

  render() {
    let countryFlag = this.state.country[this.props.lang];
    return (
      <div style={{position: 'relative', display: 'inline-block'}}>
        <div className={css(styles.placeholderFlag)} onClick={e => {this.doShowLanguage()}}>
          <img src={`/assets/flags/${countryFlag}.svg`} alt="flag" className={css(styles.flag)}/>
        </div>

        <div className={css(styles.langContainer)} ref={el => {this.element = el}}>
          <div className={css(styles.langItem)} onClick={e => {this.onChange('idn')}}>
            <img src="/assets/flags/id.svg" alt="flag" className={css(styles.flagSSmall)}/> Bahasa Indonesia
          </div>
          <div className={css(styles.langItem)} onClick={e => {this.onChange('en')}}>
            <img src="/assets/flags/gb.svg" alt="flag" className={css(styles.flagSSmall)}/> English
          </div>
        </div>
      </div>
    );
  }
}
