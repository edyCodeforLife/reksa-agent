import * as React from "react";
import {styles} from './styles';
import { css } from 'aphrodite';
import {isEqual} from 'lodash';
import SignaturePad from 'signature_pad';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUndo from '@fortawesome/fontawesome-free-solid/faUndo';

export class Signature extends React.Component<any, any> {
    signatureInstance: any = null;
    element: any = null;
    boxElement: any = null;
    clearBtn: any = null;
    intervalInstance: any = null;
    steps: any = [];

    constructor(props) {
        super(props);
        this.state = {
            signatureProfile: props.signatureProfile
        };

        if (props.signatureProfile && props.signatureProfile.speciment1)
            this.steps.push(props.signatureProfile.speciment1);

        this.clearSignature = this.clearSignature.bind(this);
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return !isEqual(this.props, nextProps) || !isEqual(this.state.signatureProfile, nextState.signatureProfile);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signatureProfile && !isEqual(nextProps.signatureProfile, this.state.signatureProfile)) {
            this.setState({
                signatureProfile: nextProps.signatureProfile
            }, () => {
                if (this.signatureInstance) {
                    if (this.clearBtn && !this.props.disableClear) {
                        this.clearBtn.style.display = 'block';
                    }
                    if (this.state.signatureProfile) {
                        this.signatureInstance
                            .fromDataURL(this.state.signatureProfile.speciment1, {ratio: 1});

                        if (this.steps.length) {
                            if (this.steps[this.steps.length - 1] !== this.state.signatureProfile.speciment1) {
                                this.steps.push(this.state.signatureProfile.speciment1);
                            }
                        }
                        else this.steps.push(this.state.signatureProfile.speciment1);
                    }
                }
            })
        }
    }

    componentDidMount() {
        if (this.element) {
            if (this.boxElement) {
                if (!this.intervalInstance) {
                    this.intervalInstance = setInterval(() => {
                        if (this.boxElement) {
                            let pInfo = this.boxElement.getBoundingClientRect();
                            let {height, width} = pInfo;
                            if (height && width) {
                                clearInterval(this.intervalInstance);
                                this.element.width = width - 4;
                                this.element.height = height - 4;
                                this.signatureInstance = new SignaturePad(this.element, {
                                    backgroundColor: 'rgb(255,255,255)',
                                    onEnd: () => {
                                        if (this.clearBtn && !this.props.disableClear) {
                                            this.clearBtn.style.display = 'block';
                                        }
                                        let sign = this.signatureInstance.toDataURL();
                                        this.props.onSignatureChanged(sign);
                                    }
                                });

                                if (this.signatureInstance) {
                                    if (this.clearBtn && !this.props.disableClear) {
                                        this.clearBtn.style.display = 'block';
                                    }
                                    if (this.state.signatureProfile)
                                        this.signatureInstance
                                            .fromDataURL(this.state.signatureProfile.speciment1, {ratio: 1});
                                }
                            }
                        }
                    }, 100);
                }
            }
        }
    }

    componentWillUnmount() {
        if (this.signatureInstance) {
            clearInterval(this.intervalInstance);
        }
    }

    clearSignature() {
        if (this.steps.length) {
            this.steps.pop();
        }

        if (this.steps.length) {
            let sign = this.steps[this.steps.length-1];
            if (this.signatureInstance) {
                this.signatureInstance
                    .fromDataURL(sign, {ratio: 1})
            }
            this.props.onSignatureChanged(sign);
        } else {
            if (this.clearBtn && !this.props.disableClear) {
                this.clearBtn.style.display = 'none';
                this.signatureInstance.clear();
                this.setState({signatureProfile: null});
                this.props.onSignatureChanged(null);
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className={css(styles.container)}>
                    <h3 className={css(styles.title, this.props.error && styles.errorText)}>{this.props.title}</h3>
                    <div
                        ref={ref => {this.boxElement = ref;}}
                        className={css(styles.signatureBox)}
                    >
                        {this.props.disableClear?<div className={css(styles.masking)} />:null }
                        <div
                            style={{display: 'none'}}
                            ref={ref => {this.clearBtn = ref;}}
                            onClick={() => {this.clearSignature()}}
                            className={css(styles.clearSignature)}
                        >
                            <FontAwesomeIcon icon={faUndo} />
                        </div>
                        <canvas ref={ref => {this.element = ref;}}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}