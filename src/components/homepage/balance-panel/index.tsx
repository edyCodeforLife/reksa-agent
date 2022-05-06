import * as React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { css } from 'aphrodite';

import * as Languages from '../../../data/languages';
import { styles } from './styles';
import { CustomLinks } from '../../custom-link';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight';

export class BalancePanel extends React.Component<any, any> {
    timeoutInstance: any = null;

    constructor(props) {
        super(props);

        this.state = {
            goalWidth: 0,
            durationWidth: 0
        }
    }

    componentDidMount() {
        this.timeoutInstance = setTimeout(() => {
            this.setState({
                goalWidth: 75,
                durationWidth: 50
            })
        }, 1000);
    }

    componentWillUnmount() {
        if (this.timeoutInstance) clearTimeout(this.timeoutInstance);
    }

    render() {
        return (
            <div className={css(styles.innerWhitePanel)}>
                <h4 className={css(styles.title)}>Kas Tersedia</h4>
                <div className={css(styles.blueRoundedBox)}>
                    Rp 980.000.000
                </div>

                <CustomLinks to="" className={css(styles.withdrawButton)}>
                    Beli Produk
                    <div className={css(styles.rightCircleBox)}>
                        <FontAwesomeIcon icon={faChevronRight} className={css(styles.rightCircleIcon)} />
                    </div>
                </CustomLinks>

                {/*<hr className={css(styles.separator)}/>*/}

                {/*<div className={css(styles.meterBox)}>*/}
                    {/*<Row>*/}
                        {/*<Col md={6}>*/}
                            {/*<span>Goal : <strong>{this.state.goalWidth}</strong>%</span>*/}
                            {/*<div className={css(styles.meterContainer)}>*/}
                                {/*<span className={css(styles.meterFill, styles.meterFillGreen)} style={{width: `${this.state.goalWidth}%`}}></span>*/}
                            {/*</div>*/}
                        {/*</Col>*/}

                        {/*<Col md={6}>*/}
                            {/*<span>Duration : <strong>4</strong>Y</span>*/}
                            {/*<div className={css(styles.meterContainer)}>*/}
                                {/*<span className={css(styles.meterFill, styles.meterFillYellow)} style={{ width: `${this.state.durationWidth}%` }}></span>*/}
                            {/*</div>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                {/*</div>*/}
            </div>
        )
    }
}