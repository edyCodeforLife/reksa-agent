import * as React from 'react';
import { find } from 'lodash';
import { object } from 'dot-object';
import { ScreenComponent } from './screen';
import * as Languages from '../../../data/languages';
import { WithForm } from '../../../components';
import { UserLoginService } from '../../../data/business/auth/login';
import {goTo} from '../../../data/global/functions';
import update from 'immutability-helper';
import Mousetrap from 'mousetrap';
import 'mousetrap-global-bind';

interface ISignInStates {
    formCollections: any,
    submitted: boolean,
    warning: any,
    activeTab?: any
}

export class SignIn extends WithForm {
    service = new UserLoginService();
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

    state: ISignInStates = {
        submitted: false,
        warning: null,
        formCollections: []
    };

    defaultState: ISignInStates = {
        submitted: false,
        activeTab: 0,
        warning: null,
        formCollections: [{
            fieldId: 'signin',
            md: 12,
            fields: [
                {
                    fieldId: 'userEmail',
                    type: 'email',
                    required: true,
                    labelKey: 'EMAIL_LABEL',
                }, {
                    fieldId: 'userPassword',
                    type: 'password',
                    required: true,
                    labelKey: 'PASSWORD_LABEL',
                }
            ]
        }]
    }

    constructor(props: any) {
        super(props);

        this.state = this.defaultState;
        this.onSubmit = this.onSubmit.bind(this);
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

    onSubmit() {
        if (this.checkFieldsValidity()) {
            this.setState({submitted: true});
            let fieldValue = this.getFieldValueMapped();

            this.service.Login(fieldValue, {
                Success: (data) => {
                    this.props.setAppState({ token: data.authToken, userDetail: data.user });

                    // redirect to kyc / homepage TODO
                    let to = 'kyc';
                    if (data.user.isProfileComplete) to = '';
                    goTo(this.props.history, to, this.props.appState.appLanguage);
                },
                Locked: (data) => {
                    let warning = Languages[this.props.appState.appLanguage]['ERR_LOGIN_LOCKED'] +
                        data.message + Languages[this.props.appState.appLanguage]['ERR_MINUTES'];
                    this.setState({submitted: false, warning });
                },
                Suspended: () => {
                    let warning = Languages[this.props.appState.appLanguage]['ERR_ACCOUNT_LOCKED'];
                    this.setState({ submitted: false, warning });
                },
                WrongPassword: () => {
                    let flattenForm = this.transFormFlatten( this.state.formCollections[0] );
                    let passwordField = find(flattenForm, {fieldId: 'userPassword'});
                    let q = this.getDottedQueryObject(passwordField, {
                        error: Languages[this.props.appState.appLanguage]['ERR_PASSWORD_NOT_MATCH']
                    }, 0);
                    let newFormCollections = update(this.state.formCollections, object(q));
                    this.setState({submitted: false, formCollections: newFormCollections});
                }
            });
        }
    }

    render () {
        return (
            <ScreenComponent
                submitted={this.state.submitted}
                warning={this.state.warning}
                onSubmit={this.onSubmit}
                formCollections={this.state.formCollections}
                {...this.props} quotes={this.quotes}
            />
        );
    }
}
