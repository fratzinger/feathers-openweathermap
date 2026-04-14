import type { Params } from '@feathersjs/feathers'
import type { OneCallData, OneCallResult } from './types.js'
import { BaseService } from './BaseService.js'

export class OneCallService extends BaseService {
  async find(params: Params & { query: OneCallData }): Promise<OneCallResult> {
    return this.request(params.query, 'onecall')
  }

  async create(data: OneCallData): Promise<OneCallResult> {
    return this.request(data, 'onecall')
  }
}
