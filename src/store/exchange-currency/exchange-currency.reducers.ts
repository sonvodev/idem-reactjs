import { IExchangeCurrencyState, ExchangeCurrencyState, ExchangeTypes } from "./index";
import { ITypedAction, LiveExchangeListing } from "../../model";
import { ExchangeCurrencyMutations, IExchangeCurrencyMutations } from "./exchange-currency.mutations";

const initialExchangeCurrencyState = new ExchangeCurrencyState({
  currencies: [],
  liveExchangeData: new LiveExchangeListing({}),
  previousConvertingResult: null
})

const mutation: IExchangeCurrencyMutations = new ExchangeCurrencyMutations


export const exchangeCurrencyReducer =
  (state: IExchangeCurrencyState = initialExchangeCurrencyState, action: ITypedAction): IExchangeCurrencyState => {

    switch (action.type) {
      case ExchangeTypes.FETCH_CURRENCIES_SUCCESS:
        return mutation.receiveCurrencies(state, action.payload)
      case ExchangeTypes.FETCH_LIVE_EXCHANGE_SUCCESS:
        return mutation.receiveLiveExchange(state, action.payload)
      case ExchangeTypes.CONVERT_INTERNAL:
        return mutation.calculateManually(state, action.payload)
      case ExchangeTypes.CONVERT_SUCCESS:
        return mutation.receiveConvertedExchangeCurrency(state, action.payload)
      default:
        return state;
    }

  }