import * as React from 'react';
import { css } from 'aphrodite';
import { Container, Row, Col } from 'react-grid-system';

import * as Languages from '../../data/languages';
import { Header, Footer } from '../../components';
import { styles } from './styles';
import {ProductAsList} from '../../components/products/as-list';

export class Screen extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let state = this.props.appState;
        return (
            <React.Fragment>
                <Header lang={state.appLanguage} activeNav={"products"} {...this.props} />
                <div className={css(styles.innerSection)} >
                    <ProductAsList {...this.props} />
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}
