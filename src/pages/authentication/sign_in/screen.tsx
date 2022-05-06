import * as React from 'react';
import { AuthenticationHeader, AuthenticationShared, CustomLinks } from '../../../components';
import { css } from 'aphrodite';
import * as Languages from '../../../data/languages';
import { Form } from '../../../components/forms';
import { globalColorDefault } from '../../../data/global/variables';
import { Row, Col } from 'react-grid-system';

import { styles } from './style';
import {Footer} from '../../../components/homepage/footer';

export class ScreenComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render () {
        let state = this.props.appState;
        let lang = state.appLanguage;
        return (
            <React.Fragment>
                <AuthenticationHeader lang={state.appLanguage} {...this.props}/>
                <AuthenticationShared {...this.props}>
                    <div className={css(styles.innerContent)}>
                        <h1 className={css(styles.title)}>{Languages[lang]['SIGN_IN']}</h1>

                        {this.props.warning?(<div className={css(styles.warning)}>
                            {this.props.warning}
                        </div>):null}

                        <Form formDefinition={this.props.formCollections[0]} {...this.props}/>

                        <Row>
                            <Col md={6}>
                                <CustomLinks to="forgot_password" style={{textDecoration: 'none', display: 'inline-block',
                                    color: globalColorDefault, fontWeight: 500, lineHeight: '40px', marginTop: 12}}>
                                    {Languages[lang]['FORGOT_PASSWORD_LABEL']}
                                </CustomLinks>
                            </Col>

                            <Col md={6}>
                                <div style={{textAlign: 'right'}}>
                                    <button
                                        disabled={this.props.submitted}
                                        onClick={this.props.onSubmit}
                                        className={css(styles.button)}
                                    >
                                        {Languages[lang]['SIGN_IN_BTN']}</button>
                                </div>
                            </Col>

                            {/*<Col md={12} style={{position: 'relative', textAlign: 'center'}}>*/}
                                {/*<div className={css(styles.orLabel)} />*/}
                                {/*<span className={css(styles.span)}>{Languages[lang]['OR_LABEL']}</span>*/}
                            {/*</Col>*/}

                            <Col md={12} style={{position: 'relative', textAlign: 'center'}}>
                                <div className={css(styles.haveAccount)}>
                                    <br /><br />
                                    {Languages[lang]['IF_DONT_HAVE_ACCOUNT_LABEL']}
                                    <CustomLinks to="sign_up" style={{textDecoration: 'none',
                                        color: globalColorDefault, fontWeight: 700}}>
                                        {Languages[lang]['HERE_LABEL']}
                                    </CustomLinks>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </AuthenticationShared>
                <Footer />
            </React.Fragment>
        );
    }
}
