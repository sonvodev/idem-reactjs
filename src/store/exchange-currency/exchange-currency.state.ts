import { IRootState, RootState } from "../root.state";
import { ICurrencyListing, ILiveExchangeListing } from "../../model";

export interface IExchangeCurrencyState extends IRootState {
  currencies: ICurrencyListing[]
  liveExchangeData: ILiveExchangeListing
  previousConvertingResult: number | null
}
export class ExchangeCurrencyState extends RootState implements IExchangeCurrencyState {
  /**
   *
   */
  currencies: ICurrencyListing[]
  liveExchangeData: ILiveExchangeListing
  previousConvertingResult: number | null

  constructor(opt: IExchangeCurrencyState) {
    super(opt);
  }

}