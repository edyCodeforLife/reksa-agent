import * as React from 'react';
import { css } from 'aphrodite';
import { Container, Row, Col } from 'react-grid-system';

import * as Languages from '../../../data/languages';
import { styles } from './style';
import QuotesElement from './quotes';
const colorEnd = '#005099';
const colorStart = '#0B8FDE';

export const AuthenticationShared: React.SFC<any> = (props: any) => (
    <div className={css(styles.innerSection)}>
        <Container>
            <div style={{background: '#fff', padding: '0', margin: '0 0 36px'}}>
                <Row >
                    <Col md={4} style={{
                        overflow: 'inherit',
                        backgroundColor: colorEnd,
                        background: `linear-gradient(135deg, ${colorStart} 0%,${colorEnd} 100%)`,
                        filter: `progid:DXImageTransform.Microsoft.gradient(startColorstr='${colorStart}', endColorstr='${colorEnd}',GradientType=1)`
                    }} >
                        <div className={css(styles.blueGradient)}>
                            <div>
                                <img className={css(styles.iconPlaceholder)}  src="/assets/images/kyc/03_Hero.png" />
                            </div>

                            <QuotesElement {...props} />
                        </div>
                    </Col>

                    <Col md={8} style={{overflow: 'inherit'}}>
                        {props.children}
                    </Col>
                </Row>
            </div>
        </Container>
    </div>
);
