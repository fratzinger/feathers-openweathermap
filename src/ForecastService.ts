import type { Params } from '@feathersjs/feathers'
import type {
  FiveDay3HourForecastData,
  FiveDay3HourForecastResult,
  HourlyForecast4DaysData,
  HourlyForecast4DaysResult,
  DailyForecast16DaysData,
  DailyForecast16DaysResult,
  ClimaticForeCast30DaysData,
  ClimaticForeCast30DaysResult,
} from './types.js'
import { BaseService } from './BaseService.js'

export class ForecastService extends BaseService {
  async find(
    params: Params & { query: FiveDay3HourForecastData },
  ): Promise<FiveDay3HourForecastResult> {
    return this.request(params.query, 'forecast')
  }

  async create(
    data: FiveDay3HourForecastData,
  ): Promise<FiveDay3HourForecastResult> {
    return this.request(data, 'forecast')
  }
}

export class HourlyForecastService extends BaseService {
  async find(
    params: Params & { query: HourlyForecast4DaysData },
  ): Promise<HourlyForecast4DaysResult> {
    return this.request(params.query, 'forecast/hourly')
  }

  async create(
    data: HourlyForecast4DaysData,
  ): Promise<HourlyForecast4DaysResult> {
    return this.request(data, 'forecast/hourly')
  }
}

export class DailyForecastService extends BaseService {
  async find(
    params: Params & { query: DailyForecast16DaysData },
  ): Promise<DailyForecast16DaysResult> {
    return this.request(params.query, 'forecast/daily')
  }

  async create(
    data: DailyForecast16DaysData,
  ): Promise<DailyForecast16DaysResult> {
    return this.request(data, 'forecast/daily')
  }
}

export class ClimaticForecastService extends BaseService {
  async find(
    params: Params & { query: ClimaticForeCast30DaysData },
  ): Promise<ClimaticForeCast30DaysResult> {
    return this.request(params.query, 'forecast/climate')
  }

  async create(
    data: ClimaticForeCast30DaysData,
  ): Promise<ClimaticForeCast30DaysResult> {
    return this.request(data, 'forecast/climate')
  }
}
