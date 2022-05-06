import * as React from 'react';
import { assign } from 'lodash';
import { object } from 'dot-object';

import { ScreenComponent } from './screen';
import { WithForm } from '../../../components';
import * as Languages from '../../../data/languages';
import { UserRegisterService } from '../../../data/business/auth/register';
import { UserLoginService } from '../../../data/business/auth/login';

import { find } from 'lodash';
import { strongPassword, goTo, validateEmail } from '../../../data/global/functions';
import update from 'immutability-helper';

interface ISignUpStates {
    formCollections: any
    agree?: any,
    submitted?: boolean
    activeTab?: number,
}

export class SignUp extends WithForm {
    service = new UserRegisterService();
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

    state: ISignUpStates = {
        formCollections: [],
        activeTab: 0,
        agree: true
    };

    defaultState: ISignUpStates = {
        agree: true,
        submitted: false,
        activeTab: 0,
        formCollections: [
            {
                fieldId: 'sign_up',
                md: 12,
                fields: [
                    {
                        fieldId: 'email',
                        type: 'email',
                        required: true,
                        labelKey: 'EMAIL_LABEL',
                        onChangeFunction: 'emailChanged'
                    }, {
                        fieldId: 'fullname',
                        type: 'masked',
                        regex: "[a-zA-Z ]+",
                        required: true,
                        labelKey: 'FULLNAME_LABEL',
                        onChangeFunction: 'onFirstNameChanged'
                    }, {
                        fieldId: 'phone',
                        type: 'masked',
                        masking: '+99999 9999 9999999',
                        required: true,
                        labelKey: 'PHONE_NUMBER_LABEL',
                        onChangeFunction: 'phoneChanged',
                        value: '62'
                    }, {
                        fieldId: 'password',
                        type: 'password',
                        required: true,
                        labelKey: 'PASSWORD_LABEL',
                        onChangeFunction: 'passwordChanged'
                    }, {
                        fieldId: 'confirmPassword',
                        type: 'password',
                        required: true,
                        labelKey: 'CONFIRM_PASSWORD_LABEL',
                        onChangeFunction: 'confirmPasswordChanged'
                    }
                ]
            }
        ]
    }

    constructor(props: any) {
        super(props);

        this.onAgreeChanged = this.onAgreeChanged.bind(this);
        this.state = this.defaultState;

        this.emailChanged = this.emailChanged.bind(this);
        this.phoneChanged = this.phoneChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.confirmPasswordChanged = this.confirmPasswordChanged.bind(this);
        this.comparePasswordWithConfirm = this.comparePasswordWithConfirm.bind(this);
        this.onFirstNameChanged = this.onFirstNameChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onFirstNameChanged(field: any, value: any) {
        let query = this.getDottedQueryObject(
            field,
            { value: value.replace(/\b\w/g, l => l.toUpperCase()) },
            0
        );

        let newFormCollections = update(this.state.formCollections, object(query));
        this.setState({ formCollections: newFormCollections });
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
        let passwordField = find(flattenForm, {fieldId: 'password'});
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
        let confirmPassword = find(flattenForm, {fieldId: 'confirmPassword'});
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

    phoneChanged(field: any, value: any) {
        if (value && value.length < 10) {
            let query = this.getDottedQueryObject(
                field,
                { value,
                    error: Languages[this.props.appState.appLanguage]['PHONE_MINIMAL_ERROR']},
                0
            );

            let newFormCollections = update(this.state.formCollections, object(query));
            this.setState({ formCollections: newFormCollections });
            return;
        }

        if (value && value !== '') {
            this.service.IsPhoneRegistered(value, () => {
                // phoneRegistered
                console.log('phoneRegistered');
                let query = this.getDottedQueryObject(
                    field,
                    { value, error: Languages[this.props.appState.appLanguage]['PHONE_REGISTERED_ERROR']},
                    0
                );

                let newFormCollections = update(this.state.formCollections, object(query));
                this.setState({ formCollections: newFormCollections });
                return;
            }, () => {
                // phoneNotRegistered
            });
        }
    }

    emailChanged(field: any, value: any) {
        if (validateEmail(value)) {
            // email is valid, check availability to backend
            this.service.IsEmailRegistered(value, () => {
                // emailNotregistered
                console.log('emailNotregistered');
                let query = this.getDottedQueryObject(
                    field,
                    {value, error: ''},0
                );
                let newFormCollections = update(this.state.formCollections, object(query));
                this.setState({ formCollections: newFormCollections });
                return;
            }, () => {
                // emailRegisteredButNotVerified
                console.log('emailRegisteredButNotVerified');
                let query = this.getDottedQueryObject(
                    field,
                    {value, error: Languages[this.props.appState.appLanguage]['EMAIL_REGISTERED_ERROR']},
                    0
                );
                let newFormCollections = update(this.state.formCollections, object(query));
                this.setState({ formCollections: newFormCollections });

            }, () => {
                // emailRegistered
                let query = this.getDottedQueryObject(
                    field,
                    {value, error: Languages[this.props.appState.appLanguage]['EMAIL_REGISTERED_ERROR']},
                    0
                );
                let newFormCollections = update(this.state.formCollections, object(query));
                this.setState({ formCollections: newFormCollections });

                return;
            });
        }
    }

    onSubmit() {
        let formValid = this.touchForm();
        if (formValid && this.state.agree) {
            let fieldValue = this.getFieldValueMapped();
            fieldValue.phoneCountryCode = '62';

            this.setState({ submitted: true });

            this.service.RegisterUser(fieldValue, {
                registerSuccess: () => {
                    let loginService = new UserLoginService();
                    loginService.Login({userEmail: fieldValue.email, userPassword: fieldValue.password}, {
                        Success: (data) => {
                            this.props.setAppState({token: data.authToken, userDetail: data.user});

                            // redirect to kyc
                            // TODO
                            goTo(this.props.history, 'kyc', this.props.appState.appLanguage);
                        }
                    });
                },
                registerNotSuccess: (response) => {
                    console.log(response);
                    // TODO: handle error
                    this.setState({ submitted: false });
                }
            });
        }
    }

    onAgreeChanged(val: any) {
        this.setState({agree: !this.state.agree})
    }

    render () {
        return (
            <ScreenComponent
                submitted={this.state.submitted}
                onSubmit={this.onSubmit}
                formCollections={this.state.formCollections}
                {...this.props} quotes={this.quotes}
                agree={this.state.agree}
                onAgreeChanged={this.onAgreeChanged}
            />
        );
    }
}
