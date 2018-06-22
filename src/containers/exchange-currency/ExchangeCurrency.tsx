import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IProps, IState } from './ExchangeCurrency.PropsState'
import {
  Grid, Row, Col, FormControl,
  Glyphicon, Clearfix, FormGroup, ControlLabel
} from 'react-bootstrap'
import './ExchangeCurrency.css'
import { IRootReducer } from '../../store/root.reducers';
import { Dispatch, connect } from 'react-redux';
import { ITypedAction, ICurrencyListing } from '../../model';
import {
  IExchangeCurrencyParameter,
  ExchangeCurrencyParameter
} from '../../model/exchange/exchange.parameter';
import { exchangeActions } from '../../store/exchange-currency';
import MaskedInput from 'react-text-mask'
import { Message } from 'element-react'
import ExchangePreviewer from './components/exchange-previewer/ExchangePreviewer'
import createNumberMask from '../../utils/create-number-mask';
class ExchangeCurrencyContainer extends React.Component<IProps, IState>{
  /**
   *
   */
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      amount: '',
      previousStartingCurrency: 'USD',
      searchParam: new ExchangeCurrencyParameter({
        from: 'USD',
        to: 'EUR'
      })
    }
  }

  _clearTimeout: any
  /**
   * Set new value for state and call convert manually
   * @param target ReactElement
   * @param fieldName: State property
   */
  handleConvertManually(target: any, fieldName: string) {
    this.handleTextChange(fieldName, target)
    clearTimeout(this._clearTimeout)
    this._clearTimeout = setTimeout(() => this._handleConvertManually(), 300);
  }

  /**
   * Private method for invoking convertManually
   * Just for method seperation purpose
   */
  private _handleConvertManually() {
    this.props.convertManually!(this.state.searchParam)
      .catch(err => Message.error(err))
  }

  /**
   * Set new value for amount of state
   * Convert formatted string to float number for converting process
   * Call convertManually
   * 
   * @param target ReactElement
   * @param fieldName State porperty
   */
  handleMaskChange(target: any, fieldName: string) {

    this.setState({ amount: target ? target.value : '' })

    clearTimeout(this._clearTimeout)
    this._clearTimeout = setTimeout(() => {

      const amount: string[] = target.value.split('').filter((char: string) => char !== '$' && char !== ',')

      if (amount.length > 0) {
        let fAmount = parseFloat(amount.join(''))
        this.handleTextChange(fieldName, undefined, fAmount)
        this._handleConvertManually()
      }
    }, 300);
  }

  /**
   * Set new value for state
   * 
   * @param fieldName State property
   * @param target ReactElement
   * @param value 
   */
  handleTextChange(fieldName: string, target?: any, value?: any, ) {
    const { searchParam } = this.state
    searchParam[fieldName] = value || target.value
    this.setState({ searchParam })
  }

  componentDidMount() {
    this.props.fetchLatest!(this.state.searchParam)
      .catch(err => Message.error(err))
  }

  /**
   * Call convert api directly after changing starting currency
   * Debound: 300
   * 
   * @param target 
   * @param fieldName 
   */

  handleConvert(target: any, fieldName: string) {
    this.handleTextChange('source', target)
    this.handleTextChange(fieldName, target)
    clearTimeout(this._clearTimeout)
    this._clearTimeout = setTimeout(() => {
      this.props.fetchBySource!(this.state.searchParam)
        .catch(err => {
          Message.error('hello' + err.info)
          this.handleTextChange('from', undefined, this.state.previousStartingCurrency)
        })
    }, 300);
  }

  /**
   * Render options for select
   * @param currencies List of currencies
   */
  _renderCurrenciesOption(currencies: ICurrencyListing[]) {
    if (currencies) {
      return Object.keys(currencies).map((key: string, index: number) => <option value={key} key={key}>{key}{' - '} {currencies[key]}</option>)
    } else return null
  }

  render() {
    const { currencies, previousConvertingResult } = this.props
    return (
      <Grid>
        <Row className='show-grid'>

          <Col md={3}>
            <FormGroup controlId="formInlineName">
              <ControlLabel>Amount</ControlLabel>{' '}
              <MaskedInput
                placeholder='Amount'
                value={this.state.amount}
                mask={createNumberMask({ allowDecimal: true })}
                className='form-control'
                onChange={(event) => this.handleMaskChange(event.target, 'amount')}
                id='1'
                type='text'
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup controlId="formInlineName">
              <ControlLabel>Starting currency</ControlLabel>{' '}
              <FormControl componentClass="select" defaultValue={'EUR'}
                value={this.state.searchParam.from}
                placeholder="select"
                onChange={(event: any) => this.handleConvert(ReactDOM.findDOMNode(event.target), 'from')}
              >
                {this._renderCurrenciesOption(currencies!)}
              </FormControl>
            </FormGroup>
          </Col>
          <Col md={1}>
            <Glyphicon glyph='resize-horizontal' />
          </Col>
          <Col md={3}>
            <FormGroup controlId="formInlineName">
              <ControlLabel>Target currency</ControlLabel>{' '}
              <FormControl componentClass="select" defaultValue={'EUR'} value={this.state.searchParam.to} placeholder="select"
                onChange={(event: any) => this.handleConvertManually(ReactDOM.findDOMNode(event.target), 'to')}
              >
                {this._renderCurrenciesOption(currencies!)}
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Clearfix />
        <Row className='show-grid'>
          <Col md={11}>
            <ExchangePreviewer searchParam={this.state.searchParam} result={previousConvertingResult!} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state: IRootReducer) => ({ ...state.exchangeCurrencyReducer })

const mapDispatchToProps = (dispatch: Dispatch<ITypedAction>) => ({
  fetchLatest: (param: IExchangeCurrencyParameter) => new Promise(
    (resolve, reject) => dispatch(exchangeActions.fetchLatest(param, resolve, reject))
  ),
  fetchBySource: (param: IExchangeCurrencyParameter) => new Promise(
    (resolve, reject) => dispatch(exchangeActions.fetchBySource(param, resolve, reject, ))
  ),
  convert: (param: IExchangeCurrencyParameter) => new Promise(
    (resolve, reject) => dispatch(exchangeActions.convert(param, resolve, reject))
  ),
  convertManually: (param: IExchangeCurrencyParameter) => new Promise(
    (resolve, reject) => dispatch(exchangeActions.convertManually(param, resolve, reject))
  )
})
export default connect<any, any, IProps>(mapStateToProps, mapDispatchToProps)(ExchangeCurrencyContainer)