import * as React from 'react';
import { Row, Col } from 'react-grid-system';
import { css } from 'aphrodite';

import * as Languages from '../../../data/languages';
import { styles } from './styles';
import { CustomLinks } from '../../custom-link';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowUp from '@fortawesome/fontawesome-free-solid/faArrowUp';
import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown';
export class InvestmentValue extends React.Component<any, any> {

    render() {
        return (
            <div className={css(styles.innerWhitePanel)}>
                <Row >
                    <Col md={6}>
                        <h2 className={css(styles.title)}>Nilai Investasi Saat Ini</h2>
                        <div className={css(styles.earningPotention)}>
                            Rp 110.000.000
                        </div>

                        <CustomLinks to="" className={css(styles.lineBtn, styles.extraLineBtnStyle)}>
                            Selengkapnya
                        </CustomLinks>
                    </Col>
                    <Col md={6}>
                        <div className={css(styles.potentionBox)}>
                            <h2 className={css(styles.title)}>Potensi Laba/Rugi</h2>
                            <div className={css(styles.earningPotention)}>
                                Rp 980.000.000
                            </div>

                            <div style={{marginTop: 28, marginBottom: 12, paddingLeft: 80, paddingRight: 80}}>
                                <Row>
                                    <Col md={6}>
                                        <span className={css(styles.grey)}>Overal Growth</span>
                                        <div className={css(styles.margintopbottom)}>
                                            <FontAwesomeIcon icon={faArrowDown} className={css(styles.arrowDown)} />
                                            - 10%
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className={css(styles.averageDaily)}>
                                            <span className={css(styles.grey)}>Average Daily</span>
                                            <div className={css(styles.margintopbottom)}>
                                                <FontAwesomeIcon icon={faArrowUp} className={css(styles.arrowUp)} />
                                                + 24%
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}