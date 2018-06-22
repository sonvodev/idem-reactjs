export interface ITypedAction<T = any> {
  payload?: T
  error?: any
  meta?: any | { resolve: any, reject: any }
  type: string
}

export class TypedAction<T = any> implements ITypedAction<T> {
  payload?: T
  error?: any
  meta?: any
  type: string
  /**
   *
   */
  constructor(type: string, opt: { payload?: T, error?: any, meta?: any }) {
    this.type = type
    this.payload = opt.payload
    this.error = opt.error
    this.meta = opt.meta
  }
}