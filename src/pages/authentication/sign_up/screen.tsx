import * as React from 'react';
import { AuthenticationHeader, AuthenticationShared, CustomLinks } from '../../../components';
import { css } from 'aphrodite';
import * as Languages from '../../../data/languages';
import { Form } from '../../../components/forms';
import { globalColorDefault } from '../../../data/global/variables';
import { Container, Row, Col } from 'react-grid-system';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSquare from '@fortawesome/fontawesome-free-regular/faSquare';
import faCheckSquare from '@fortawesome/fontawesome-free-regular/faCheckSquare';

import { styles } from './style';
import {Footer} from '../../../components/homepage/footer';

export class ScreenComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            agree: props.agree,
            submitted: props.submitted
        }
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.agree !== this.state.agree || (nextProps.submitted !== this.state.submitted)) {
            this.setState({ agree: nextProps.agree, submitted: nextProps.submitted});
        }
    }

    render () {
        let state = this.props.appState;
        let lang = state.appLanguage;
        let icon = this.state.agree?faCheckSquare:faSquare;
        return (
            <React.Fragment>
                <AuthenticationHeader lang={state.appLanguage} {...this.props}/>
                <AuthenticationShared {...this.props}>
                    <div className={css(styles.innerContent)}>
                        <h1 className={css(styles.title)}>{Languages[lang]['SIGN_UP']}</h1>

                        <Form formDefinition={this.props.formCollections[0]} {...this.props}/>

                        <Row>
                            <Col md={7}>
                                {/*<div className={css(styles.checkbox)} style={{paddingTop: 12}}>*/}
                                    {/*<FontAwesomeIcon*/}
                                        {/*onClick={this.props.onAgreeChanged} icon={icon}*/}
                                        {/*className={css(styles.checkboxIcon)}*/}
                                    {/*/>*/}
                                    {/*<div style={{display: 'inline-block', paddingLeft: 35}}>*/}
                                        {/*{Languages[lang]['AGREE_LABEL']}*/}
                                        {/*<CustomLinks to="tnc" style={{textDecoration: 'none',*/}
                                            {/*color: globalColorDefault}}>*/}
                                            {/*{Languages[lang]['AGREE_LINK_LABEL']}*/}
                                        {/*</CustomLinks>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            </Col>

                            <Col md={5}>
                                <div style={{textAlign: 'right'}}>
                                    <button
                                        disabled={this.state.submitted}
                                        onClick={this.props.onSubmit}
                                        className={css(styles.button)}
                                    >
                                        {Languages[lang]['SIGN_UP_BTN']}
                                    </button>
                                </div>
                            </Col>

                            {/*<Col md={12} style={{position: 'relative', textAlign: 'center'}}>*/}
                                {/*<div className={css(styles.orLabel)} />*/}
                                {/*<span className={css(styles.span)}>{Languages[lang]['OR_LABEL']}</span>*/}
                            {/*</Col>*/}

                            <Col md={12} style={{position: 'relative', textAlign: 'center'}}>
                                <div className={css(styles.haveAccount)}>
                                    <br /> <br />
                                    {Languages[lang]['IF_HAVE_ACCOUNT_LABEL']}
                                    <CustomLinks to="sign_in" style={{textDecoration: 'none',
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
