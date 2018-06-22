import { AppConfig } from "../common";

export interface IBaseParameter {
}
export class BaseParameter implements IBaseParameter {
  /**
   *
   */
  access_key: string

  constructor(opt: IBaseParameter) {
    this.access_key = AppConfig.AccessKey
    Object.keys(opt).forEach(key => this[key] = opt[key])

  }
}