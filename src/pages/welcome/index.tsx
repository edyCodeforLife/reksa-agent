import * as React from 'react';
import { css } from 'aphrodite';
import { Container, Row, Col } from 'react-grid-system';

import * as Languages from '../../data/languages';
import { AuthenticationHeader, Footer, CustomLinks } from '../../components';
import { styles } from './styles';

export class Welcome extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let state = this.props.appState;
        return (
            <React.Fragment>
                <AuthenticationHeader lang={state.appLanguage} {...this.props} />
                <div className={css(styles.innerSection)} >
                    <Container>
                        <Row>
                            <Col style={{ overflow: 'inherit' }} md={12}>
                                <div className={css(styles.panelHead)}>
                                    <div className={css(styles.panelHeadTitle)}>
                                        <Row>
                                            <Col style={{ overflow: 'inherit' }} md={8}>
                                                <div className={css(styles.headerTitleBox)}>
                                                    <h1 className={css(styles.panelHeadTitleText, styles.biggerTitle)}>
                                                        {Languages[state.appLanguage]['WELCOME_TO_MODUIT']}
                                                    </h1>
                                                    <p className={css(styles.subtitle)}>your gateway to wealth</p>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className={css(styles.headerTitleLogo)}>
                                            <img
                                                src="/assets/images/kyc/05_icon_profil_saya.png"
                                                alt="logo hero"
                                                className={css(styles.headerTitleLogoImage)}
                                            />
                                        </div>
                                    </div>

                                    <div className={css(styles.innerWelcome)}>
                                        <h2 className={css(styles.questionText)}>
                                            {Languages[state.appLanguage]['INVESTMENT_KNOWLEDGE_QUESTION']}
                                        </h2>

                                        <div style={{marginTop: 24}}>
                                            <CustomLinks to="a-glimpse-of-mutual-funds" className={css(styles.button)}>
                                                {Languages[state.appLanguage]['INVESTMENT_FIRST_ANSWER']}
                                            </CustomLinks>
                                            <CustomLinks to="" className={css(styles.button)} style={{marginLeft: 20}}>
                                                {Languages[state.appLanguage]['INVESTMENT_SECOND_ANSWER']}
                                            </CustomLinks>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}
