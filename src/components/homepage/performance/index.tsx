import * as React from 'react';
import { Row, Col } from 'react-grid-system';
import { css } from 'aphrodite';

import * as Languages from '../../../data/languages';
import { styles } from './styles';
import { CustomLinks } from '../../custom-link';
import {PerformanceChart} from './chart';
import {GoalIsEmpty} from './goal-is-empty';
import {GoalIsNotEmpty} from './goal-is-not-empty';

export class Performance extends React.Component<any, any> {
    render() {
        return (
            <div className={css(styles.innerWhitePanel)}>
                <Row >
                    <Col md={4}>
                        <GoalIsNotEmpty {...this.props} />
                    </Col>
                    <Col md={8}>
                        <div className={css(styles.potentionBox)}>
                            <h2 className={css(styles.title)}>Performa</h2>
                            <PerformanceChart />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}