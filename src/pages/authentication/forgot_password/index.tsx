import * as React from 'react';
import { findIndex } from 'lodash';
import { ScreenComponent } from './screen';
import * as Languages from '../../../data/languages';
import { WithForm } from '../../../components';
import {ResendCode} from './resend-code';
import { find, assign } from 'lodash';
import { object } from 'dot-object';

import Mousetrap from 'mousetrap';
import 'mousetrap-global-bind';

import { strongPassword } from '../../../data/global/functions';
import update from 'immutability-helper';
import {ForgotPasswordService, IForgotPasswordService} from '../../../data/business/auth/forgot';

interface IForgotPasswordStates {
    activeTab: any,
    formCollections: any,
    warning: any,
    submitted: any,
    initialStatus: boolean,
    showModal: boolean,
    email: any
}

export class ForgotPassword extends WithForm {
    service: IForgotPasswordService = new ForgotPasswordService();
    quotes: Array<any> = [
        {
            quote: 'Someone is sitting in the shade today because someone planted a tree a long time ago.',
            author: 'Warren Buffett'
        }, {
            quote: 'Price is what you pay. Value is what you get.',
            author: 'Warren Buffett'
        }, {
            quote: 'It takes 20 years to build a reputation and five minutes to ruin it. If you think about that, you will do things differently.',
            author: 'Warren Buffett'
        }
    ];

    state: IForgotPasswordStates = {
        warning: null,
        initialStatus: true,
        formCollections: [],
        activeTab: 0,
        submitted: false,
        showModal: false,
        email: null
    };

    defaultState: IForgotPasswordStates = {
        warning: null,
        email: null,
        initialStatus: true,
        activeTab: 0,
        submitted: false,
        showModal: false,
        formCollections: [{
            fieldId: 'forgot_password',
            md: 12,
            fields: [
                {
                    fieldId: 'email',
                    type: 'email',
                    required: true,
                    labelKey: 'EMAIL_LABEL'
                }
            ]
        }]
    };

    changeState: IForgotPasswordStates = {
        warning: null,
        email: null,
        initialStatus: false,
        activeTab: 0,
        submitted: false,
        showModal: false,
        formCollections: [{
            fieldId: 'forgot_password',
            md: 12,
            fields: [
                {
                    fieldId: 'group',
                    md: 12,
                    fields: [
                        {
                            fieldId: 'email',
                            type: 'email',
                            required: true,
                            disabled: true,
                            labelKey: 'EMAIL_LABEL',
                            md: 8
                        }, {
                            fieldId: 'code',
                            type: 'text',
                            required: true,
                            labelKey: 'CODE_LABEL',
                            md: 4,
                            info: <ResendCode {...this.props} />
                        }
                    ]
                }, {
                    fieldId: 'newPassword',
                    type: 'password',
                    required: true,
                    labelKey: 'PASSWORD_LABEL',
                    onChangeFunction: 'passwordChanged'
                }, {
                    fieldId: 'confirmNewPassword',
                    type: 'password',
                    required: true,
                    labelKey: 'CONFIRM_PASSWORD_LABEL',
                    onChangeFunction: 'confirmPasswordChanged'
                }
            ]
        }]
    };

    constructor(props: any) {
        super(props);

        this.comparePasswordWithConfirm = this.comparePasswordWithConfirm.bind(this);
        this.confirmPasswordChanged = this.confirmPasswordChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = this.defaultState;
    }

    componentDidMount() {
        Mousetrap.bindGlobal('enter', () => {
            setTimeout(() => {
                this.onSubmit();
            }, 400)
        });
    }

    componentWillUnmount() {
        Mousetrap.unbindGlobal('enter');
    }

    comparePasswordWithConfirm(password: any, confirmPassword: any) {
        if (confirmPassword.value && confirmPassword.value !== '') {
            if (password.value !== confirmPassword.value) {
                return Languages[this.props.appState.appLanguage]['ERR_PASSWORD_CONFIRMATION'];
            }
        }
        return null;
    }

    confirmPasswordChanged(field: any, value: any) {
        let flattenForm = this.transFormFlatten( this.state.formCollections[0] );
        let passwordField = find(flattenForm, {fieldId: 'newPassword'});
        let query = this.getDottedQueryObject(
            field,
            { value, error: this.comparePasswordWithConfirm(passwordField, {value})},
            0
        );


        let newFormCollections = update(this.state.formCollections, object(query));
        this.setState({ formCollections: newFormCollections });
    }

    passwordChanged(field: any, value: any) {
        let flattenForm = this.transFormFlatten( this.state.formCollections[0] );
        let confirmPassword = find(flattenForm, {fieldId: 'confirmNewPassword'});
        let error = (!strongPassword(value)) ? Languages[this.props.appState.appLanguage]['ERR_STRONG_PASSWORD'] : null;

        let query = this.getDottedQueryObject(
            field,
            {value, error},
            0
        );

        if (confirmPassword && confirmPassword.value && confirmPassword.value !== '') {
            query = assign(query, this.getDottedQueryObject(
                confirmPassword,
                { error: this.comparePasswordWithConfirm({value: value}, confirmPassword)},
                0
            ));
        }
        let newFormCollections = update(this.state.formCollections, object(query));
        this.setState({ formCollections: newFormCollections });
    }

    onSubmit() {
        if (this.checkFieldsValidity()) {
            let lang = this.props.appState.appLanguage;
            if (this.state.initialStatus) {
                let fieldValue = this.getFieldValueMapped();
                this.setState({submitted: true});
                this.service.ForgotPassword(fieldValue.email, {
                    Success: () => {
                        let newState = this.changeState;
                        newState.email = fieldValue.email;
                        newState.formCollections[0].fields[0].fields[0].value = fieldValue.email;
                        newState.formCollections[0].fields[0].fields[1].info = <ResendCode {...this.props} email={fieldValue.email} />;
                        this.setState( newState, () => {
                            this.labelAssignment(lang);
                        });
                    },
                    UserNotExists: () => {
                        let warning = Languages[lang]['ERR_ACCOUNT_NOT_FOUND'];
                        this.setState({ submitted: false, warning });
                    }
                });
            } else {
                let fieldValue = this.getFieldValueMapped();
                this.setState({submitted: true});
                this.service.ChangeForgotPassword(fieldValue, {
                    Success: () => {
                        this.setState({submitted: false, showModal: true});
                    },
                    CodeNotValid: () => {
                        let warning = Languages[lang]['ERR_VERIFICATION_CODE'];
                        this.setState({ submitted: false, warning });
                    }
                });
            }
        }
    }

    render () {
        return (
            <ScreenComponent
                email={this.state.email}
                warning={this.state.warning}
                submitted={this.state.submitted}
                onSubmit={this.onSubmit}
                showModal={this.state.showModal}
                initialStatus={this.state.initialStatus}
                formCollections={this.state.formCollections}
                {...this.props} quotes={this.quotes}
            />
        );
    }
}
