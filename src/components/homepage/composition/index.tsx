import * as React from 'react';
import { Row, Col } from 'react-grid-system';
import { css } from 'aphrodite';
import VisibilitySensor from 'react-visibility-sensor';

import * as Languages from '../../../data/languages';
import { CustomLinks } from '../../custom-link';
import { styles } from './styles';
import { DonutChart } from '../donut-chart';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowUp from '@fortawesome/fontawesome-free-solid/faArrowUp';

export class Composition extends React.Component<any, any> {
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
        return (
            <VisibilitySensor onChange={this.onChange} offset={{ top: 60 }}
                              partialVisibility={true} minTopValue={200}>
                <div className={css(styles.innerWhitePanel)}>
                    <Row >
                        <Col md={5}>
                            <h2 className={css(styles.title)}>Komposisi</h2>
                            <div style={{width: '100%', height: 300}}>
                                <DonutChart visible={this.state.isVisible}/>
                                <div className={css(styles.totalGet)}>
                                    <p className={css(styles.totalGetText)}>Total Pendapatan</p>
                                    <div className={css(styles.totalGetPercentation)}>
                                        <FontAwesomeIcon icon={faArrowUp} className={css(styles.arrowUp)} />
                                        + 24%
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={7}>
                            <div className={css(styles.potentionBox)}>
                                <table style={{width: '100%', borderSpacing: 0}}>
                                    <thead>
                                        <tr >
                                            <th className={css(styles.tableHead)}>Fund Type</th>
                                            <th className={css(styles.tableHead)}>Weight</th>
                                            <th className={css(styles.tableHead)}>Nilai</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className={css(styles.tableContent)}>
                                                <span className={css(styles.pill, styles.yellowPill)}/>
                                                Money Market
                                            </td>
                                            <td className={css(styles.tableContent)}>
                                                30%
                                            </td>
                                            <td className={css(styles.tableContent)}>
                                                Rp. 12.534.234
                                                <span className={css(styles.viewDetail)}>
                                                    View detail
                                                    <span style={{marginLeft: 12, fontSize: 10, color: '#555'}}>▼</span>
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={css(styles.tableContent)}>
                                                <span className={css(styles.pill, styles.bluePill)}/>
                                                Balanced
                                            </td>
                                            <td className={css(styles.tableContent)}>
                                                20%
                                            </td>
                                            <td className={css(styles.tableContent)}>
                                                Rp. 12.534.234
                                                <span className={css(styles.viewDetail)}>
                                                    View detail
                                                    <span style={{marginLeft: 12, fontSize: 10, color: '#555'}}>▼</span>
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={css(styles.tableContent)}>
                                                <span className={css(styles.pill, styles.greenPill)}/>
                                                Equity
                                            </td>
                                            <td className={css(styles.tableContent)}>
                                                25%
                                            </td>
                                            <td className={css(styles.tableContent)}>
                                                Rp. 12.534.234
                                                <span className={css(styles.viewDetail)}>
                                                    View detail
                                                    <span style={{marginLeft: 12, fontSize: 10, color: '#555'}}>▼</span>
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={css(styles.tableContent)}>
                                                <span className={css(styles.pill, styles.greyPill)}/>
                                                Fixed Income
                                            </td>
                                            <td className={css(styles.tableContent)}>
                                                25%
                                            </td>
                                            <td className={css(styles.tableContent)}>
                                                Rp. 12.534.234
                                                <span className={css(styles.viewDetail)}>
                                                    View detail
                                                    <span style={{marginLeft: 12, fontSize: 10, color: '#555'}}>▼</span>
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <CustomLinks to="" className={css(styles.lineBtn, styles.extraLineBtnStyle)}>
                                    Lihat Selengkapnya
                                </CustomLinks>
                            </div>
                        </Col>
                    </Row>
                </div>
            </VisibilitySensor>
        )
    }
}