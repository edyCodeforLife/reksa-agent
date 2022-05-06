import React, { Component, ReactElement } from 'react';
import axios from 'axios';
import * as LS from 'local-storage';
import SimpleCryptoJS from 'simple-crypto-js';

import {cookiesName, cookiesDetailName, lsProductName, SECRET_KEY} from './data/global/variables';

import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

import {whyDidYouUpdate} from 'why-did-you-update';
import {MainHistoricalService, IMainHistoricalService} from './data/business/main/main';
import {AnalyticsEntryDataService} from './data/analytics/data/entry';
import {LocalAuthenticationContext} from './data/services/auth/user';
import * as ls from "local-storage";
import {AnalyticsLocalStorage} from './data/analytics/config';

export class AppState extends Component<any, any> {
    service: IMainHistoricalService = null;
    simpleCrypto: any = new SimpleCryptoJS(SECRET_KEY);

    constructor(props: any) {
        super(props);

        let token = Cookies.get(cookiesName);
        let userDetail = null;

        if (token) {
            userDetail = JSON.parse(Cookies.get(cookiesDetailName));
            axios.defaults.headers.common['md-token'] = token;
        }

        let urlLanguage = window.location.pathname.split('/')[1];
        if (urlLanguage) {
            if (['en', 'idn'].indexOf(urlLanguage) < 0) urlLanguage = 'idn';
        } else {
            urlLanguage = 'idn';
        }

        let productFromLS = LS.get(lsProductName);
        let decryptedText: any = { histories: [], version: 0 };
        if (productFromLS) {
            decryptedText = this.simpleCrypto.decrypt(productFromLS);
            if (decryptedText) {
                decryptedText = JSON.parse(decryptedText);
            }
        }

        this.state = {
            token: token,
            userDetail: userDetail,
            async: {},
            appLanguage: urlLanguage,
            appToken: null,
            appDetail: null,
            productList: decryptedText.histories,
            version: decryptedText.version
        };

        this.setAppState = this.setAppState.bind(this);

        // if (process.env.NODE_ENV !== 'production') {
        //     whyDidYouUpdate(React, { exclude: /^(AppState|Router|Route|File|Col|Row|Container|Modal|ScreenComponent|Kyc|KycForm)$/ })
        // }
    }

    componentDidMount() {
        let analytics = new AnalyticsEntryDataService();
        // check if logged in and finish KYC, get product list data
        let {userDetail} = this.state;
        let userId = userDetail ? this.state.userDetail.email : "";
        analytics.CreateNewEntry({UserId: userId, SessionId: ""}).then(id => {
            ls.set(AnalyticsLocalStorage, id.data);
        });

        if (userDetail && userDetail.isProfileComplete) {
            // do in background
            setTimeout(() => {
                this.service = new MainHistoricalService();
                this.service.GetMainHistorical({
                    Success: data => {
                        if (data) {
                            let encryptedText = this.simpleCrypto.encrypt(JSON.stringify(data));
                            LS.set(lsProductName, encryptedText);
                            this.setState({productList: data.histories, version: data.version});
                        }
                    }
                }, this.state.version);
            }, 100);
        }
    }

    static childContextTypes = {
        gutterWidth: PropTypes.number
    };

    getChildContext = () => ({
        gutterWidth: 12
    });

    setAppState(updater: object, callback?: any) {
        this.setState(updater, () => {
            if (callback) {
                callback();
            }
        });
    }

    render() {
        return (
            <div className="AppState">
                {React.Children.map(this.props.children, child => {
                    return React.cloneElement(child as ReactElement<any>, {
                        appState: this.state,
                        setAppState: this.setAppState
                    });
                })}
            </div>
        );
    }
}
