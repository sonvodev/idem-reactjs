import { IRootAction, RootAction } from "../root.actions";
import { ITypedAction } from "../../model";
import { ExchangeTypes } from ".";
import { IExchangeCurrencyParameter } from "../../model/exchange/exchange.parameter";

export interface IExchangeActions extends IRootAction {
  fetchLatest(param: IExchangeCurrencyParameter, resolve: any, reject: any): ITypedAction<IExchangeCurrencyParameter>
  fetchBySource(param: IExchangeCurrencyParameter, resolve: any, reject: any): ITypedAction<IExchangeCurrencyParameter>
  convert(param: IExchangeCurrencyParameter, resolve: any, reject: any): ITypedAction<IExchangeCurrencyParameter>
  receivedCurrencies(payload: any): ITypedAction
  receivedConvertedExchange(payload: any): ITypedAction
  convertManually(payload: IExchangeCurrencyParameter, resolve: any, reject: any): ITypedAction
}
export class ExchangeActions extends RootAction implements IExchangeActions {

  convertManually(payload: IExchangeCurrencyParameter, resolve: any, reject: any): ITypedAction<any> {
    return { type: ExchangeTypes.CONVERT_INTERNAL, payload }
  }
  fetchLatest(param: IExchangeCurrencyParameter, resolve: any, reject: any): ITypedAction<IExchangeCurrencyParameter> {
    return { type: ExchangeTypes.FETCH_CURRENCIES, payload: param, meta: { resolve, reject } }
  }
  fetchBySource(param: IExchangeCurrencyParameter, resolve: any, reject: any): ITypedAction<IExchangeCurrencyParameter> {
    return { type: ExchangeTypes.FETCH_LIVE_EXCHANGE, payload: param, meta: { resolve, reject } }
  }

  convert(param: IExchangeCurrencyParameter, resolve: any, reject: any): ITypedAction<IExchangeCurrencyParameter> {
    return { type: ExchangeTypes.CONVERT, payload: param, meta: { resolve, reject } }
  }

  receivedCurrencies(payload: any): ITypedAction {
    return { type: ExchangeTypes.FETCH_CURRENCIES_SUCCESS, payload: payload }
  }
  receivedLiveExchange(payload: any): ITypedAction {
    return { type: ExchangeTypes.FETCH_LIVE_EXCHANGE_SUCCESS, payload: payload }
  }

  receivedConvertedExchange(payload: any): ITypedAction {
    return { type: ExchangeTypes.CONVERT_SUCCESS, payload: payload }
  }
}

export const exchangeActions = new ExchangeActions