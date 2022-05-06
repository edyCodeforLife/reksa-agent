import * as React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import {goalUrlAlias} from '../../../data/global/variables';
import Modal from 'react-responsive-modal';

import { css } from 'aphrodite';

import * as Languages from '../../../data/languages';
import { styles } from './style';
import { Language } from './language';
import { CustomLinks } from '../../custom-link';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {myStyles} from '../../authentication/header/styles';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';

import {goTo} from '../../../data/global/functions';
import {UserLoginService} from '../../../data/business/auth/login';
import faQuestion from '@fortawesome/fontawesome-free-solid/faQuestion';

export class Header extends React.Component<any, any> {
    element: any = null;
    languages: any = { idn: 'ID', en: 'GB' };
    duration: any = 800;
    service = new UserLoginService();

    constructor(props: any) {
        super(props);
        let name = null;
        let isProfileComplete = false;
        try {
            name = props.appState.userDetail.firstName.split(' ')[0];
            isProfileComplete = props.appState.userDetail.isProfileComplete;
        } catch (e) {
            console.log(e);
        }

        this.onSelectFlag = this.onSelectFlag.bind(this);
        this.state = {
            activeNav: props.activeNav || 'summary',
            name,
            isProfileComplete,
            openModal: false
        };

        this.eventClickListener = this.eventClickListener.bind(this);
        this.doLogout = this.doLogout.bind(this);
        this.displayMenu = this.displayMenu.bind(this);
        this.goTo = this.goTo.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.activeNav !== nextProps.activeNav) {
            this.setState({activeNav: nextProps.activeNav});
        }
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
        let currentHistory = this.props.history;

        if (newLanguage && newLanguage !== lang) {
            let currentUrl = currentHistory.location.pathname.split(`/${lang}/`)[1];
            window.location.href = `/${newLanguage}/${currentUrl}`;
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

    goTo(to: any) {
        this.setState({menuOpened: false, openModal: false}, () => {
            goTo(this.props.history, to, this.props.appState.appLanguage);
        })
    }

    render() {
        let { lang } = this.props;
        return (
            <div className={css(styles.headerBg, styles.authenticationBg)} ref={el => { this.element = el; }}>
                <Container>
                    <Row>
                        <Col md={8} xs={8} style={{ overflow: 'inherit' }}>
                            <div className={css(styles.logoWithoutName)}>
                                <CustomLinks to="" style={{ display: 'block', padding: '7px 0', cursor: 'pointer', outline: 'none' }}>
                                    <img src="/assets/images/moduit_with_logo.png" alt="logo"
                                         className={css(styles.logoNameAuthentcation)}
                                    />
                                </CustomLinks>
                            </div>

                            <div className={css(styles.menuBox)}>
                                <div className={css(styles.menuItem)}>
                                    <CustomLinks
                                        to=""
                                        className={
                                            css(
                                                styles.menuItemLink,
                                                this.state.activeNav === 'summary' && styles.menuItemLinkActive
                                            )
                                        }
                                    >
                                        {Languages[this.props.lang]['SUMMARY_LABEL']}
                                    </CustomLinks>
                                </div>

                                <div className={css(styles.menuItem)}>
                                    <CustomLinks
                                        to="products"
                                        className={
                                            css(
                                                styles.menuItemLink,
                                                this.state.activeNav === 'products' && styles.menuItemLinkActive
                                            )
                                        }
                                    >
                                        {Languages[this.props.lang]['PRODUCT_LABEL']}
                                    </CustomLinks>
                                </div>

                                <div className={css(styles.menuItem)}>
                                    <CustomLinks
                                        to=""
                                        className={
                                            css(
                                                styles.menuItemLink,
                                                this.state.activeNav === 'transaction' && styles.menuItemLinkActive
                                            )
                                        }
                                    >
                                        {Languages[this.props.lang]['TRANSACTION_LABEL']}
                                    </CustomLinks>
                                </div>

                                <div className={css(styles.menuItem)}>
                                    <CustomLinks
                                        to={`goals/${goalUrlAlias.step1}`}
                                        className={
                                            css(
                                                styles.menuItemLink,
                                                styles.goalBtn,
                                                this.state.activeNav === 'goalSetting' && styles.menuItemGoalLinkActive
                                            )
                                        }
                                    >
                                        {Languages[this.props.lang]['GOAL_SETTING_LABEL']}
                                    </CustomLinks>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} xs={4} style={{ overflow: 'inherit' }}>
                            <div className={css(styles.alignRight)}>
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
                                                onClick={() => { this.goTo('kyc') }}
                                                className={css(myStyles.menuItemDropdown, myStyles.longItem)}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faUser}
                                                    className={css(myStyles.iconMenuDropdown)}
                                                />
                                                {Languages[this.props.lang]['MY_PROFILE']}
                                            </div>

                                            <div
                                                onClick={() => { this.setState({menuOpened: false, openModal: true}); }}
                                                className={css(myStyles.menuItemDropdown, myStyles.longItem)}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSignOutAlt}
                                                    className={css(myStyles.iconMenuDropdown)}
                                                />
                                                {Languages[this.props.lang]['LOGOUT_LABEL']}
                                            </div>
                                        </div>
                                    </div>:null}
                                </div>
                                {this.state.isProfileComplete?<CustomLinks className={css(styles.circleIcon)}>
                                    <img className={css(styles.circleIconInside)} src={'/assets/logos/09_icon_Notification_Active.svg'} />
                                    {/*<FontAwesomeIcon icon={faBell} className={css(styles.circleIconInside)} />*/}
                                    <span className={css(styles.redDot)}/>
                                </CustomLinks>:null}
                                {this.state.isProfileComplete?<CustomLinks className={css(styles.circleIcon)}>
                                    <img className={css(styles.circleIconInside)} src={'/assets/logos/10_icon_Cart_Disable.svg'} />
                                    <span className={css(styles.redDot)}/>
                                    {/*<FontAwesomeIcon icon={faShoppingCart} className={css(styles.circleIconInside)} />*/}
                                </CustomLinks>:null}

                                <Language lang={lang} onChange={this.onSelectFlag} />
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
                            <span>
                                {Languages[lang]['LOGOUT_KYC_QUESTION_2']}
                            </span>
                        </div>

                        <button
                            onClick={() => {this.setState({openModal: false}, () =>{
                                this.doLogout();
                            }); }}
                            className={css(myStyles.lineBtn)}
                        >
                            {Languages[this.props.lang]['OK_LABEL']}
                        </button>
                        <button
                            onClick={() => {this.setState({openModal: false}); }}
                            className={css(myStyles.blueBtn)}
                        >
                            {Languages[this.props.lang]['NO_LABEL']}
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}
