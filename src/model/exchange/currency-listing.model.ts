import { IBaseModel, BaseModel } from "../basemodel";

export interface ICurrencyListing extends IBaseModel {
  [key: string]: any
}
export class CurrencyListing extends BaseModel implements ICurrencyListing {
  /**
   *
   */
  constructor(opt: ICurrencyListing = {}) {
    super(opt);
  }
}