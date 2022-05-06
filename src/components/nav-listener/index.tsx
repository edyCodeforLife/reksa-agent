import * as React from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { cookiesName } from '../../data/global/variables';

class NavListener extends React.Component<any, any> {
    navigatorChanged() {
        // // window.scrollTo(0, 0);
        let currentLang = this.props.location.pathname.split('/')[1];
        if (currentLang === this.props.appState.appLanguage) window.scrollTo(0, 0);

        // check user authentication
        let token = Cookies.get(cookiesName);
        let currentHistory = this.props.history;
        let publicUrls = [
            `/${this.props.appState.appLanguage}/sign_in`,
            `/${this.props.appState.appLanguage}/sign_up`,
            `/${this.props.appState.appLanguage}/forgot_password`
        ];

        if (!token) {
            let currentUrl = currentHistory.location.pathname;
            if (publicUrls.indexOf(currentUrl) < 0) {
                setTimeout(() => {
                    currentHistory.push('/' + this.props.appState.appLanguage + '/sign_in');
                });
            }
            return;
        } else {
            // if logged in, go to home
            // if isProfileComplete false, prevent to go anywhere but kyc
            let currentUrl = currentHistory.location.pathname;
            let { isProfileComplete } = this.props.appState.userDetail;
            let lang = this.props.appState.appLanguage;

            // TODO
            if (!isProfileComplete) {
                if (currentUrl !== `/${lang}/kyc`) {
                    currentHistory.push(`/${lang}/kyc`);
                    return;
                }
            }

            if (publicUrls.indexOf(currentUrl) > -1) {
                setTimeout(() => {
                    currentHistory.push(`/${lang}`);
                });
            }
        }

        if (currentHistory.location.pathname === '/') {
            currentHistory.push('/' + this.props.appState.appLanguage + '');
        } else {

            if (['idn', 'en'].indexOf(currentLang) > -1) {
                if (currentLang !== this.props.appState.appLanguage) {
                    this.props.setAppState({appLanguage: currentLang});
                }
            } else {
                currentHistory.push('/' + this.props.appState.appLanguage + '');
            }
        }

        console.log('navigate changed');
    }

    componentDidMount() {
        this.navigatorChanged();
    }

    componentDidUpdate(prevProps: any) {
        if (this.props.location !== prevProps.location) {
            this.navigatorChanged();
        }
    }

    render() {
        return (
            <React.Fragment>
                { this.props.children }
            </React.Fragment>
        )
    }
}

export default withRouter(NavListener);
