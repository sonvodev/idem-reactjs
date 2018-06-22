import { IExchangeCurrencyState } from ".";
import { ICurrencyListing } from "../../model";
import { ActivityStatus } from "../../common/enum/activity.enum";
import { ILiveExchangeListing } from "../../model/exchange/live-exchange-listing.model";

export interface IExchangeCurrencyMutations {

  receiveConvertedExchangeCurrency(state: IExchangeCurrencyState, payload: any): IExchangeCurrencyState
  receiveCurrencies(state: IExchangeCurrencyState, currencies: ICurrencyListing[]): IExchangeCurrencyState
  receiveLiveExchange(state: IExchangeCurrencyState, liveExchangeData: ILiveExchangeListing[]): IExchangeCurrencyState
  calculateManually(state: IExchangeCurrencyState, payload: { from: string, to: string, amount: string }): IExchangeCurrencyState
}

export class ExchangeCurrencyMutations implements IExchangeCurrencyMutations {

  calculateManually(state: IExchangeCurrencyState, payload: { from: string, to: string, amount: string }): IExchangeCurrencyState {

    const { quotes } = state.liveExchangeData
    const rate = quotes![`${payload.from}${payload.to}`]
    const newState = {}

    if (payload.amount) {
      newState['previousConvertingResult'] = rate * parseFloat(payload.amount)
    }
    return Object.assign({}, state, newState)
  }
  receiveConvertedExchangeCurrency(state: IExchangeCurrencyState, payload: any): IExchangeCurrencyState {
    return Object.assign({}, state, {

    })
  }
  receiveCurrencies(state: IExchangeCurrencyState, currencies: ICurrencyListing[]): IExchangeCurrencyState {
    return Object.assign({}, state, {
      currencies,
      activityStatus: ActivityStatus.Loaded
    })
  }
  receiveLiveExchange(state: IExchangeCurrencyState, liveExchangeData: ILiveExchangeListing[]): IExchangeCurrencyState {
    return Object.assign({}, state, {
      liveExchangeData,
      activityStatus: ActivityStatus.Loaded
    })
  }
}