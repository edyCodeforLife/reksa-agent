import * as React from 'react';
import { Row, Col } from 'react-grid-system';
import { css } from 'aphrodite';

import * as Languages from '../../../data/languages';
import { styles } from './styles';
import { CustomLinks } from '../../custom-link';

export class GoalIsEmpty extends React.Component<any, any> {

    render() {
        let lang = this.props.appState.appLanguage;
        return (
            <React.Fragment>
                <h2 className={css(styles.title)}>
                    {Languages[lang]['YOUR_FINANCIAL_JOURNEY']}
                </h2>
                <div className={css(styles.financialPlaneNoneBox)}>
                    <img
                        style={{width: '80%', margin: '56px 0 24px'}}
                        src="/assets/logos/14_Perjalanan_Finansial.svg"
                    />
                    <p className={css(styles.financialPlaneNoneText)}>
                        {Languages[lang]['YOU_DO_NOT_HAVE_FINANCIAL_PLAN']}
                    </p>
                </div>
                <CustomLinks to="" className={css(styles.blueGradientBtn)}>
                    {Languages[lang]['CREATE_YOUR_PLAN']}
                </CustomLinks>
            </React.Fragment>
        )
    }
}