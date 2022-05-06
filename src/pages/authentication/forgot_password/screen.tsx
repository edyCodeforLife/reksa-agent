import * as React from 'react';
import { AuthenticationHeader, AuthenticationShared, CustomLinks } from '../../../components';
import { css } from 'aphrodite';
import * as Languages from '../../../data/languages';
import { Form } from '../../../components/forms';
import { globalColorDefault } from '../../../data/global/variables';
import { Row, Col } from 'react-grid-system';

import { goTo } from '../../../data/global/functions';

import { styles } from './style';
import {Footer} from '../../../components/homepage/footer';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Modal from 'react-responsive-modal';

export class ScreenComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            submitted: props.submitted,
            initialStatus: props.initialStatus,
            warning: props.warning,
            showModal: props.showModal || false
        }
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.submitted !== this.state.submitted) {
            this.setState({ submitted: nextProps.submitted});
        }

        if (nextProps.initialStatus !== this.state.initialStatus) {
            this.setState({ initialStatus: nextProps.initialStatus});
        }

        if (nextProps.warning !== this.state.warning) {
            this.setState({ warning: nextProps.warning});
        }

        if (nextProps.showModal !== this.state.showModal) {
            this.setState({ showModal: nextProps.showModal});
        }
    }

    render () {
        let state = this.props.appState;
        let lang = state.appLanguage;
        return (
            <React.Fragment>
                <AuthenticationHeader lang={state.appLanguage} {...this.props}/>
                <AuthenticationShared {...this.props}>
                    <div className={css(styles.innerContent)}>
                        <h1 className={css(styles.title)}>{Languages[lang]['FORGOT_PASSWORD_LABEL']}</h1>
                        {this.state.initialStatus?<p>{Languages[lang]['FORGOT_PASSWORD_SUBTITLE_LABEL']}</p>:null}
                        {!this.state.initialStatus?<p>{Languages[lang]['RESET_PASSWORD_SENT']}</p>:null}

                        {this.state.warning?(<div className={css(styles.warning)}>
                            {this.state.warning}
                        </div>):null}

                        <Form formDefinition={this.props.formCollections[0]} {...this.props}/>

                        <Row>
                            <Col md={12}>
                                <button
                                    disabled={this.state.submitted}
                                    onClick={this.props.onSubmit}
                                    className={css(styles.button)}
                                >
                                    {Languages[lang]['SEND_LABEL']}
                                </button>
                            </Col>

                            <Col md={12} style={{position: 'relative'}}>
                                <div className={css(styles.haveAccount)}>
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
                <Modal
                    open={this.state.showModal}
                    onClose={() => {}}
                    little
                    showCloseIcon={false}
                    styles={{overlay: {background: 'rgba(3,78,161,.28)'}}}
                >
                    <div className={css(styles.insideModal)}>
                        <div className={css(styles.logoBox)}>
                            <FontAwesomeIcon
                                icon={faCheck} className={css(styles.checkSuccess)} />
                        </div>

                        <div className={css(styles.textBox)}>
                            {Languages[state.appLanguage]['CHANGE_PASSWORD_SUCCESS']}
                        </div>

                        <button
                            onClick={() => { goTo(this.props.history, 'sign_in', state.appLanguage)}}
                            className={css(styles.button)}
                        >
                            {Languages[state.appLanguage]['OK_LABEL']}
                        </button>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}
