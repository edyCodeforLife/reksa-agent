import * as React from 'react';
import { css } from 'aphrodite';
import VisibilitySensor from 'react-visibility-sensor';
import Countdown from 'react-countdown-now';
import { styles } from './style';
import * as Languages from '../../../data/languages';
import {goTo, randomChar} from '../../../data/global/functions';
import {ForgotPasswordService, IForgotPasswordService} from '../../../data/business/auth/forgot';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Modal from 'react-responsive-modal';

export class ResendCode extends React.Component<any, any> {
    seconds: number = 1000 * 600;
    visible: boolean = false;
    service: IForgotPasswordService = new ForgotPasswordService();

    constructor(props: any) {
        super(props);

        let state = this.props.appState;
        let lang = state.appLanguage;
        this.state = {
            key: randomChar(),
            lang,
            timer: false,
            openModal: false
        };

        this.onChange = this.onChange.bind(this);
        this.renderer = this.renderer.bind(this);
        this.resendCode = this.resendCode.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    renderer({ minutes, seconds, completed }) {
        if (completed) {
            // Render a complete state
            return (
                <div
                    onClick={this.resendCode}
                    className={css(styles.resendLink)}
                >
                    {Languages[this.state.lang]['RESEND_CODE']}
                </div>
            );
        } else {
            // Render a countdown
            return <small className={css(styles.red)}>{minutes}:{seconds}</small>;
        }
    };

    resendCode() {
        this.service.ForgotPassword(this.props.email, {
            Success: () => {
                this.setState({openModal: true});
            }
        });
    }

    resetTimer() {
        this.setState({
            key: randomChar(),
            timer: Date.now() + this.seconds
        });
    }

    onChange() {
        if (!this.visible) {
            this.visible = true;
            this.resetTimer();
        }
    }

    render() {
        return (
            <VisibilitySensor
                onChange={this.onChange} offset={{ top: 60 }}
                partialVisibility={true} minTopValue={200}>
                <div className={css(styles.resendBox)}>
                    {this.state.timer?<Countdown
                        key={this.state.key}
                        date={this.state.timer}
                        renderer={this.renderer}
                    />:null}

                    <Modal
                        open={this.state.openModal}
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
                                {Languages[this.props.appState.appLanguage]['RESET_PASSWORD_SENT_2']}
                            </div>

                            <button
                                onClick={() => {this.setState({openModal: false}, () => {
                                    this.resetTimer();
                                })}}
                                className={css(styles.button)}
                            >
                                {Languages[this.props.appState.appLanguage]['OK_LABEL']}
                            </button>
                        </div>
                    </Modal>
                </div>
            </VisibilitySensor>
        );
    }
}
