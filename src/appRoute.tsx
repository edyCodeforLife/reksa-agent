import * as React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { Route } from 'react-router';

import {
    Homepage, Error404, SignIn, ForgotPassword, SignUp, Welcome, Products
} from './pages';

import NavListener from './components/nav-listener';

class AppRoute extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <NavListener {...this.props}>
                <Switch>
                    <Route
                        exact path="/:lang/"
                        render={() => <Homepage {...this.props} />}
                    />

                    <Route
                        exact path="/:lang/sign_up"
                        render={() => <SignUp {...this.props} />}
                    />

                    <Route
                        exact path="/:lang/sign_in"
                        render={() => <SignIn {...this.props} />}
                    />

                    <Route
                        exact path="/:lang/forgot_password"
                        render={() => <ForgotPassword {...this.props} />}
                    />

                    <Route
                        exact path="/:lang/welcome"
                        render={() => <Welcome {...this.props} />}
                    />

                    <Route
                        exact path={`/:lang/products`}
                        render={() => <Products {...this.props} />}
                    />

                    <Route path="*" component={Error404} />
                </Switch>
            </NavListener>
        );
    }
}

export default withRouter(AppRoute);
