import { BaseService } from "./base.service";
import { IExchangeCurrencyParameter } from "../model/exchange/exchange.parameter";
import { ExchangeURL } from "../common/urls/exchange";
import { LiveExchangeListing, ICurrencyListing } from "../model";

export interface IExchangeCurrencyService {
  fetchCurrencies(param: IExchangeCurrencyParameter): Promise<any>
  fetchLiveExchange(param: IExchangeCurrencyParameter): Promise<any>
  convert(param: IExchangeCurrencyParameter): Promise<any>
}
export class ExchangeCurrencyService extends BaseService implements IExchangeCurrencyService {
  /**
   *
   */
  constructor(path?: string) {
    super(path!);
  }

  /**
   * Fetch list currencies
   * @param param IExchangeCurrencyParameter
   */
  public fetchCurrencies(param: IExchangeCurrencyParameter): Promise<any> {
    return super.select(ExchangeURL.List, param)
      .then((response) => {
        if (!response.success) return Promise.reject(response.error)
        return Promise.resolve(response.currencies as ICurrencyListing[])
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error)
      })
  }

  /**
   * Fetch list live exchange
   * @param param IExchangeCurrencyParameter
   */
  public fetchLiveExchange(param: IExchangeCurrencyParameter): Promise<any> {
    return super.select(ExchangeURL.Live, param)
      .then((response) => {
        if (!response.success) return Promise.reject(response.error)
        return Promise.resolve(new LiveExchangeListing(response))
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error)
      })
  }

  /**
   * Convert amount by starting currency and target currency
   * @param param 
   */
  public convert(param: IExchangeCurrencyParameter): Promise<any> {
    return super.select(ExchangeURL.Convert, param)
      .then((response) => {
        return response.success
          ? Promise.resolve(response)
          : Promise.reject(response.error)
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error)
      })
  }
}