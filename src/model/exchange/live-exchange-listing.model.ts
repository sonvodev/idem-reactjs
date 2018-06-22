import { IBaseModel, BaseModel } from "../basemodel";

export interface ILiveExchangeListing extends IBaseModel {
  terms?: string
  privacy?: string
  timestamp?: string
  source?: string
  quotes?: { [key: string]: number }
}
export class LiveExchangeListing extends BaseModel implements ILiveExchangeListing {
  /**
   *
   */
  terms?: string
  privacy?: string
  timestamp?: string
  source?: string
  quotes?: { [key: string]: number }

  constructor(opt: ILiveExchangeListing) {
    super(opt)
  }
}