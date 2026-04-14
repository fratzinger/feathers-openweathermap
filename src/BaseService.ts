import type { OWMServiceOptions, QueryParams } from './types.js'
import { BadRequest } from '@feathersjs/errors'

const BASE_URL = 'https://api.openweathermap.org/data'

export class BaseService {
  options: OWMServiceOptions

  constructor(options: Partial<OWMServiceOptions> & { appid: string }) {
    this.options = {
      v: '3.0',
      mode: 'json',
      lang: 'en',
      units: 'standard',
      ...options,
    }
  }

  protected composeSearchParams(data: Record<string, any>): QueryParams {
    data = { ...data }
    const appid = data.appid || this.options.appid
    const lang = data.lang || this.options.lang
    const mode = data.mode || this.options.mode
    const units = data.units || this.options.units

    const query = {
      appid,
      lang,
      mode,
      units,
    } as QueryParams

    if (data.cityName) {
      const q = [data.cityName]
      if (data.stateCode) {
        q.push(data.stateCode)
      }
      if (data.countryCode) {
        q.push(data.countryCode)
      }
      query.q = q.join(',')
    } else if (data.cityId) {
      query.id = data.cityId
    } else if (data.lat != null && data.lon != null) {
      query.lat = data.lat
      query.lon = data.lon
    } else if (data.zipCode) {
      const zip = [data.zipCode]
      if (data.countryCode) {
        zip.push(data.countryCode)
      }
      query.zip = zip.join(',')
    }

    const keysToIgnore = new Set([
      'cityName',
      'stateCode',
      'countryCode',
      'cityId',
      'lat',
      'lon',
      'zipCode',
      'endpoint',
    ])

    for (const key in data) {
      if (!keysToIgnore.has(key)) {
        query[key] = data[key]
      }
    }

    return query
  }

  protected async request<R>(
    data: Record<string, any>,
    endpoint: string,
  ): Promise<R> {
    try {
      const queryParams = this.composeSearchParams(data)
      const searchParams = new URLSearchParams()
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined && value !== null) {
          searchParams.set(key, String(value))
        }
      }
      const v = data?.v || this.options.v
      const url = `${BASE_URL}/${v}/${endpoint}?${searchParams.toString()}`
      const response = await fetch(url)

      if (!response.ok) {
        const body = await response.text()
        throw new BadRequest(body)
      }

      if (queryParams.mode === 'json') {
        return (await response.json()) as R
      } else {
        return (await response.text()) as unknown as R
      }
    } catch (err) {
      if (err instanceof BadRequest) {
        throw err
      }
      throw new BadRequest('unprocessable', { cause: err })
    }
  }
}
