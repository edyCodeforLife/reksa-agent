import * as React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { css } from 'aphrodite';
import {isEqual} from 'lodash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import Modal from 'react-responsive-modal';

import { styles } from '../../homepage/header/style';
import { myStyles } from './styles';
import { Language } from '../../homepage/header/language';
import * as Languages from '../../../data/languages';
import faQuestion from '@fortawesome/fontawesome-free-solid/faQuestion';
import {goTo} from '../../../data/global/functions';
import {UserLoginService} from '../../../data/business/auth/login';

export class AuthenticationHeader extends React.Component<any, any> {
    element: any = null;
    languages: any = {idn: 'ID', en: 'GB'};
    duration: any = 800;
    service = new UserLoginService();

    constructor(props: any) {
        super(props);

        this.onSelectFlag = this.onSelectFlag.bind(this);
        let name = null;
        try {
            name = props.appState.userDetail.firstName.split(' ')[0];
        } catch (e) {
            // console.log(e);
        }

        this.state = { name, menuOpened: false, openModal: false };
        this.displayMenu = this.displayMenu.bind(this);
        this.eventClickListener = this.eventClickListener.bind(this);
        this.doLogout = this.doLogout.bind(this);
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
    }

    componentDidMount() {
        window.addEventListener('click', this.eventClickListener, false);
    }

    eventClickListener(evt: any) {
        if (this.state.menuOpened) {
            if ((evt.target as any).id === 'menu-dropdown') {
                this.setState({menuOpened: false});
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.eventClickListener,false);
    }

    onSelectFlag(newLanguage: any) {
        let lang = this.props.lang;
        let setAppState = this.props.setAppState;
        let currentHistory = this.props.history;

        if (newLanguage && newLanguage !== lang) {
            let currentUrl = currentHistory.location.pathname.split(`/${lang}/`)[1];
            window.location.href = `/${newLanguage}/${currentUrl}`;
            // setAppState({lang: newLanguage});
            // console.log(currentHistory.location.pathname);
            //TODO check current path
            // let currentUrl = currentHistory.location.pathname.split(`/${lang}/`)[1];
            // currentHistory.push(`/${newLanguage}/${currentUrl}`);
        }
    }

    displayMenu() {
        this.setState({menuOpened: !this.state.menuOpened});
    }

    doLogout() {
        this.service.Logout({
            Success: () =>{
                this.props.setAppState({ token: null, userDetail: null });
                // redirect to login
                goTo(this.props.history, 'sign_in', this.props.appState.appLanguage);
            }
        });
    }

    render () {
        let { lang } = this.props;
        return (
            <div className={css(styles.headerBg, styles.authenticationBg)} ref={el => {this.element = el;}}>
                <Container>
                    <Row>
                        <Col md={3} xs={8} style={{overflow: 'inherit'}}>
                            <div style={{display: 'block', padding: '7px 0'}}>
                                <img src="/assets/images/moduit_with_logo.png" alt="logo"
                                     className={css(styles.logoNameAuthentcation)}
                                />
                            </div>
                        </Col>
                        <Col md={9} xs={4} style={{overflow: 'inherit'}}>
                            <div className={css(styles.alignRight)}>
                                {this.props.loggedIn?
                                    <div className={css(myStyles.menuBox)}>
                                        <div
                                            onClick={this.displayMenu}
                                            className={css(myStyles.menuItem)}
                                        >
                                            Hi, <span className={css(myStyles.blueText)}>{this.state.name}</span>
                                            <span className={css(myStyles.caretDown, this.state.menuOpened && myStyles.caretUp)} />
                                        </div>
                                        {this.state.menuOpened?<div id={"menu-dropdown"} className={css(myStyles.dropdown)}>
                                            <div
                                                className={css(myStyles.innerDropdown)}
                                            >
                                                <div
                                                    onClick={() => { this.setState({menuOpened: false, openModal: true}); }}
                                                    className={css(myStyles.menuItemDropdown)}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faSignOutAlt}
                                                        className={css(myStyles.iconMenuDropdown)}
                                                    />
                                                    {Languages[lang]['LOGOUT_LABEL']}
                                                </div>
                                            </div>
                                        </div>:null}
                                    </div>
                                    :null}
                                <Language lang={lang} onChange={this.onSelectFlag}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Modal
                    open={this.state.openModal}
                    onClose={() => {}}
                    little
                    showCloseIcon={false}
                    styles={{overlay: {background: 'rgba(3,78,161,.28)'}}}
                >
                    <div className={css(myStyles.insideModal)}>
                        <div className={css(myStyles.logoBox, myStyles.warningLogoBox)}>
                            <FontAwesomeIcon
                                icon={faQuestion} className={css(myStyles.checkSuccess)} />
                        </div>

                        <div className={css(myStyles.textBox)}>
                            {Languages[lang]['LOGOUT_KYC_QUESTION_1']}
                            <br />
                            <span className={css(myStyles.blueText)}>
                                {Languages[lang]['LOGOUT_KYC_QUESTION_2']}
                            </span>
                        </div>
                        <button
                            onClick={() => {this.setState({openModal: false}, () =>{
                                this.doLogout();
                            }); }}
                            className={css(myStyles.secondaryBtn)}
                        >
                            {Languages[lang]['OK_LABEL']}
                        </button>
                        <button
                            onClick={() => {this.setState({openModal: false}); }}
                            className={css(myStyles.blueBtn)}
                        >
                            {Languages[lang]['NO_LABEL']}
                        </button>

                    </div>
                </Modal>
            </div>
        );
    }
}
