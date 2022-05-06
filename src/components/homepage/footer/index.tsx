import * as React from 'react';
import * as Languages from '../../../data/languages';

import { css } from 'aphrodite';
import { Container, Row, Col } from 'react-grid-system';
import { styles } from './styles';

export const Footer: React.SFC<any> = (props: any) => (
    <div  className={css(styles.footer)}>
        <div id="footer">
            <Container>
                <Row>
                    <Col md={12}>
                        <p className={css(styles.sectionContentFooter)}>
                          <span className={css(styles.grey)}>Copyright © 2018 </span> 
                          <span className={css(styles.blue)}>PT Moduit Digital Indonesia </span>
                          <span className={css(styles.grey)}>All Right reserved. </span> 
                        </p>
                    </Col>

                    {/*<Col md={6}>*/}
                      {/*<div className={css(styles.right)}>*/}
                        {/*<p className={css(styles.smallSupportedText, styles.grey)}>Supported by:</p>*/}
                        {/*<div className={css(styles.supportedImages)}>*/}
                          {/*<img className={css(styles.supportedImagesItem)} src={"/assets/images/ojk_logo.png"} alt="logo ojk" />*/}
                          {/*<img className={css(styles.supportedImagesItem)} src={"/assets/images/reksadana.png"} alt="logo reksadana" />*/}
                        {/*</div>*/}
                      {/*</div>*/}
                    {/*</Col>*/}
                </Row>
            </Container>
        </div>
    </div>
);
