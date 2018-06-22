import { combineReducers, Reducer } from 'redux'
import {
  IExchangeCurrencyState,
  exchangeCurrencyReducer
} from './exchange-currency';
import { ITypedAction } from '../model';

export interface IRootReducer {
  exchangeCurrencyReducer: Reducer<IExchangeCurrencyState, ITypedAction>
}

const reducers = combineReducers(<IRootReducer>{
  exchangeCurrencyReducer
})

export default reducers
