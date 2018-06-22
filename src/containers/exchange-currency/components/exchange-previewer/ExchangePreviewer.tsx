import * as React from 'react'
import './ExchangePreviewer.css'
import { IProps, IState } from './ExchangePreviewer.PropsState'
import { Alert, Row, Col, ControlLabel, Clearfix } from 'react-bootstrap'
export class ExchangePreviewer extends React.Component<IProps, IState>{
  /**
   *
   */
  constructor(props: Readonly<IProps>) {
    super(props);
  }
  render() {
    const { from, to, amount } = this.props.searchParam
    return (
      <Alert bsStyle='info preview'>
        <Row className='show-grid'>
          <Col md={3} className='text-right'>
            <ControlLabel>Starting Currency</ControlLabel>
          </Col>
          <Col md={5}>
            <ControlLabel>{from || 'USD'}</ControlLabel>
          </Col>
        </Row>
        <Clearfix />
        <Row className='show-grid'>
          <Col md={3} className='text-right'>
            <ControlLabel>From</ControlLabel>
          </Col>
          <Col md={5}>
            <ControlLabel>{amount || 1}</ControlLabel>
          </Col>
        </Row>
        <Clearfix />
        <Row className='show-grid'>
          <Col md={3} className='text-right'>
            <ControlLabel>Target Currency</ControlLabel>
          </Col>
          <Col md={5}>
            <ControlLabel>{to || 'EUR'}</ControlLabel>
          </Col>
        </Row>
        <Clearfix />
        <Row className='show-grid'>
          <Col md={3} className='text-right'>
            <ControlLabel>Rate</ControlLabel>
          </Col>
          <Col md={5}>
            <ControlLabel>{amount || 1}</ControlLabel>
          </Col>
        </Row>
        <Clearfix />
        <Row className='show-grid'>
          <Col md={3} className='text-right'>
            <ControlLabel>Converted Result</ControlLabel>
          </Col>
          <Col md={5}>
            <ControlLabel>{(this.props.result && this.props.result.toLocaleString()) || ''}</ControlLabel>
          </Col>
        </Row>
      </Alert>
    );
  }
}
export default ExchangePreviewer