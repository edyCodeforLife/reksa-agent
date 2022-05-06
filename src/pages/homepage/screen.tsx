import * as React from 'react';
import { Header, Footer, InvestmentValue, BalancePanel, Performance, Composition } from '../../components';
import { css } from 'aphrodite';
import { styles } from './styles';
import { Container, Row, Col } from 'react-grid-system';

export class ScreenComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render () {
        var state = this.props.appState;
        return (
            <React.Fragment>
                <Header lang={this.props.appState.appLanguage} {...this.props}/>
                <div className={css(styles.innerSection, styles.marginBottom)}>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <InvestmentValue />
                            </Col>
                            {/*<Col md={4}>*/}
                                {/*<BalancePanel />*/}
                            {/*</Col>*/}

                            <Col md={12}>
                                <Performance {...this.props}/>
                            </Col>

                            <Col md={12}>
                                <Composition />
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer lang={this.props.appState.appLanguage} />
            </React.Fragment>
        );
    }
}
