import { IBaseModel, BaseModel } from "../basemodel";

export interface ILatestExchangeCurrencyModel extends IBaseModel { }
export class LatestExchangeCurrencyModel extends BaseModel implements ILatestExchangeCurrencyModel {
  /**
   *
   */
  constructor(opt: ILatestExchangeCurrencyModel = {}) {
    super(opt);
  }
}