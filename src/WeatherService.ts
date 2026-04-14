import type { Params } from '@feathersjs/feathers'
import type {
  CurrentWeatherDataData,
  CurrentWeatherDataResult,
} from './types.js'
import { BaseService } from './BaseService.js'

export class WeatherService extends BaseService {
  async find(
    params: Params & { query: CurrentWeatherDataData },
  ): Promise<CurrentWeatherDataResult> {
    return this.request(params.query, 'weather')
  }

  async create(
    data: CurrentWeatherDataData,
  ): Promise<CurrentWeatherDataResult> {
    return this.request(data, 'weather')
  }
}
