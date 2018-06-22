export interface IBaseModel {

}
export class BaseModel implements IBaseModel {
  /**
   *
   */
  constructor(opt: IBaseModel) {
    Object.keys(opt).forEach(key => this[key] = opt[key])
  }
}