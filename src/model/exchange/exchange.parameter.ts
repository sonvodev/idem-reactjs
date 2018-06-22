import { BaseParameter, IBaseParameter } from "../baseparameter";

export interface IExchangeCurrencyParameter extends IBaseParameter {
  symbols?: string[]
  base?: string
  from?: string
  to?: string
  amount?: number
  start_date?: string
  end_date?: string
  date?: string
}
export class ExchangeCurrencyParameter extends BaseParameter implements IExchangeCurrencyParameter {
  /**
   *
   */
  symbols?: string[]
  base?: string
  start_date?: string
  end_date?: string
  amount?: number
  from?: string
  to?: string
  date?: string

  constructor(opt: IExchangeCurrencyParameter = {}) {
    super(opt);
  }
}