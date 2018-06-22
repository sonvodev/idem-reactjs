import { IApiResponse } from "../model";
import axios from 'axios'

export abstract class BaseService {

  /**
   *
   */
  private _path: string

  constructor(path: string = '') {
    this._path = path
  }
  private getPath(path: string): string {
    return path ? `${this._path}/${path}` : this._path
  }
  protected select<TParam>(path: string, params?: TParam) {
    return axios.get(this.getPath(path), { params })
      .then((response: IApiResponse) => {
        return response.isSuccess
          ? Promise.resolve(response.data)
          : Promise.reject(response.error)
      })
      .catch((error: any) => {
        return Promise.reject(error)
      })
  }
}