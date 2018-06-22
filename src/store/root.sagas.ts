import { all, fork } from "redux-saga/effects";
import { watchFetchBySource } from "./exchange-currency/exchange-currency.sagas";
import { watchFetchCurrencies, watchConvert, watchFetchLive } from "./exchange-currency";

export function* rootSaga() {
  yield all([
    fork(watchFetchCurrencies),
    fork(watchConvert),
    fork(watchFetchLive),
    fork(watchFetchBySource)
  ])
}