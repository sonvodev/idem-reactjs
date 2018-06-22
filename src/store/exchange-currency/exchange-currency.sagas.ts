import { takeLatest, put } from "redux-saga/effects";
import { ExchangeTypes } from './exchange-currency.types'
import { ExchangeCurrencyService, IExchangeCurrencyService } from "../../service";
import { ITypedAction } from "../../model";
import { exchangeActions } from "./exchange-currency.actions";
import { ActivityStatus } from "../../common/enum/activity.enum";

const service: IExchangeCurrencyService = new ExchangeCurrencyService

export function* fetchCurrencies(action: ITypedAction) {
  try {

    yield put(exchangeActions.loadingActivity(ActivityStatus.Loading,
      ExchangeTypes.EXCHANGE_LOADING))

    const result = yield service.fetchCurrencies(action.payload)
    const liveResult = yield service.fetchLiveExchange(action.payload)

    yield put(exchangeActions.receivedCurrencies(result))
    yield put(exchangeActions.receivedLiveExchange(liveResult))
  }
  catch (ex) {
    yield action.meta.reject(ex)
  }
}
export function* fetchBySource(action: ITypedAction) {
  try {

    yield put(exchangeActions.loadingActivity(ActivityStatus.Loading,
      ExchangeTypes.EXCHANGE_LOADING))
    const liveResult = yield service.fetchLiveExchange(action.payload)

    yield put(exchangeActions.receivedLiveExchange(liveResult))
    if (action.payload.amount)
      yield put(exchangeActions.convertManually(action.payload, action.meta.resolve, action.meta.reject))
  }
  catch (ex) {
    yield action.meta.reject(ex)
  }
}

export function* fetchLive(action: ITypedAction) {
  try {

    yield put(exchangeActions.loadingActivity(ActivityStatus.Loading,
      ExchangeTypes.EXCHANGE_LOADING))
    const liveResult = yield service.fetchLiveExchange(action.payload)

    yield put(exchangeActions.receivedLiveExchange(liveResult))
  }
  catch (ex) {
    yield action.meta.reject(ex)
  }
}


export function* convert(action: ITypedAction) {
  try {

    yield put(exchangeActions.loadingActivity(ActivityStatus.Loading,
      ExchangeTypes.EXCHANGE_LOADING))
    const result = yield service.convert(action.payload)

    yield put(exchangeActions.receivedCurrencies(result))
  }
  catch (ex) {
    yield action.meta.reject(ex)
  }
}
export function* convertManually(action: ITypedAction) {
  try {
    yield put(exchangeActions.convertManually(action.payload, action.meta.resolve, action.meta.reject))
  }
  catch (ex) {
    yield action.meta.reject(ex)
  }
}

export function* watchFetchCurrencies() {
  yield takeLatest(ExchangeTypes.FETCH_CURRENCIES, fetchCurrencies)
}

export function* watchConvert() {
  yield takeLatest(ExchangeTypes.CONVERT, convert)
}
export function* watchConvertManually() {
  yield takeLatest(ExchangeTypes.CONVERT_INTERNAL, convertManually)
}
export function* watchFetchLive() {
  yield takeLatest(ExchangeTypes.FETCH_LIVE_EXCHANGE, fetchLive)
}
export function* watchFetchBySource() {
  yield takeLatest(ExchangeTypes.FETCH_LIVE_EXCHANGE, fetchBySource)
}
