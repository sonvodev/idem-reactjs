import {
  ICurrencyListing,
  ILiveExchangeListing,
  IExchangeCurrencyParameter
} from "../../model";

export interface IProps {
  fetchLatest?: (param: IExchangeCurrencyParameter) => Promise<any>
  fetchBySource?: (param: IExchangeCurrencyParameter) => Promise<any>
  convert?: (param: IExchangeCurrencyParameter) => Promise<any>
  convertManually?: (param: IExchangeCurrencyParameter) => Promise<any>
  currencies?: ICurrencyListing[]
  liveExchangeData?: ILiveExchangeListing
  previousConvertingResult?: number | null
}
export interface IState {
  searchParam: IExchangeCurrencyParameter
  amount: string
  previousStartingCurrency: string
}