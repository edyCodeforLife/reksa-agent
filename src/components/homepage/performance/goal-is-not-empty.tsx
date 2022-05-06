import * as React from 'react';
import { Row, Col } from 'react-grid-system';
import { css } from 'aphrodite';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import VisibilitySensor from 'react-visibility-sensor';

import * as Languages from '../../../data/languages';
import { styles } from './styles';
import { CustomLinks } from '../../custom-link';
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight';
import faTrashAlt from '@fortawesome/fontawesome-free-regular/faTrashAlt';
import {GoalAndDuration} from '../goal-and-duration';

export class GoalIsNotEmpty extends React.Component<any, any> {
    alreadyVisible: any = false;
    counter: number = 0;
    state: any = {
        isVisible: false
    };

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    componentWillUnmount() {
        this.alreadyVisible = false;
        this.counter = 0;
    }

    onChange(isVisible: any) {
        if (this.counter) {
            if (!this.alreadyVisible && isVisible) {
                this.alreadyVisible = true;
                this.setState({isVisible});
            }
        }
        this.counter++;
    }

    render() {
        let lang = this.props.appState.appLanguage;
        return (
            <VisibilitySensor onChange={this.onChange} offset={{ top: 60 }}
                              partialVisibility={true} minTopValue={200}>
                <div>
                    <h2 className={css(styles.title)}>
                        {Languages[lang]['YOUR_FINANCIAL_JOURNEY']}
                    </h2>
                    <p>
                        Ini adalah progress investasi Anda untuk<br/>
                        <strong>membeli rumah idaman</strong>
                    </p>
                    <div className={css(styles.financialPlanBox)}>
                        <GoalAndDuration
                            visible={this.state.isVisible}
                        />

                        <GoalAndDuration
                            type={'duration'}
                            visible={this.state.isVisible}
                        />
                    </div>
                    <Row>
                        <Col md={9}>
                            <CustomLinks to="" className={css(styles.blueGradientBtn)}>
                                {Languages[lang]['CHANGE_YOUR_PLAN']}
                                <div className={css(styles.rightCircleBox)}>
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        className={css(styles.rightCircleIcon)}
                                    />
                                </div>
                            </CustomLinks>
                        </Col>
                        <Col md={3}>
                            <button className={css(styles.lineBtn, styles.extraLineBtn)}>
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    className={css(styles.deleteIcon)}
                                />
                            </button>
                        </Col>
                    </Row>
                </div>
            </VisibilitySensor>
        )
    }
}