import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';


export class Error404 extends Component<any, any> {
  render() {
    return (
      <Container>
        <Row>
          <Col md={12} style={{overflow: 'inherit'}}>
            <h3>404 page not found</h3>
            <p>We are sorry but the page you are looking for does not exist.</p>
            <a href="/">Back to homepage</a>
          </Col>
        </Row>
      </Container>
    );
  }
}
