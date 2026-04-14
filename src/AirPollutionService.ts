import type { Params } from '@feathersjs/feathers'
import type {
  AirPollutionCurrentData,
  AirPollutionForecastData,
  AirPollutionHistoricalData,
  AirPollutionResult,
} from './types.js'
import { BaseService } from './BaseService.js'

export class AirPollutionService extends BaseService {
  async find(
    params: Params & { query: AirPollutionCurrentData },
  ): Promise<AirPollutionResult> {
    return this.request(params.query, 'air_pollution')
  }

  async create(data: AirPollutionCurrentData): Promise<AirPollutionResult> {
    return this.request(data, 'air_pollution')
  }

  async forecast(data: AirPollutionForecastData): Promise<AirPollutionResult> {
    return this.request(data, 'air_pollution/forecast')
  }

  async historical(
    data: AirPollutionHistoricalData,
  ): Promise<AirPollutionResult> {
    return this.request(data, 'air_pollution/history')
  }
}
