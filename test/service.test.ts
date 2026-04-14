import { describe, it, expect, beforeAll, vi, beforeEach } from 'vitest'
import {
  WeatherService,
  OneCallService,
  ForecastService,
  HourlyForecastService,
  DailyForecastService,
  ClimaticForecastService,
  AirPollutionService,
} from '../src/index.js'

function mockFetch(data: unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data)),
    }),
  )
}

function fetchUrl(): string {
  return vi.mocked(fetch).mock.calls[0][0] as string
}

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('WeatherService', () => {
  let service: WeatherService

  beforeAll(() => {
    service = new WeatherService({ appid: 'test-key' })
  })

  const response = {
    base: 'stations',
    clouds: { all: 75 },
    cod: 200,
    coord: { lon: 11.58, lat: 48.14 },
    dt: 1625000000,
    id: 2867714,
    main: {
      temp: 293.15,
      feels_like: 292.5,
      temp_min: 291.15,
      temp_max: 295.15,
      pressure: 1013,
      humidity: 65,
    },
    name: 'Munich',
    sys: {
      type: 1,
      id: 1267,
      message: 0,
      country: 'DE',
      sunrise: 1624935000,
      sunset: 1624993000,
    },
    timezone: 7200,
    visibility: 10000,
    weather: [
      { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
    ],
    wind: { deg: 220, speed: 3.6 },
  }

  it('find by city name', async () => {
    mockFetch(response)
    const result = await service.find({
      query: { cityName: 'Munich', stateCode: 'DE' },
    })
    expect(result.name).toBe('Munich')
    expect(fetchUrl()).toContain('/3.0/weather')
    expect(fetchUrl()).toContain('q=Munich%2CDE')
  })

  it('find by city id', async () => {
    mockFetch({ ...response, name: 'Rostock' })
    const result = await service.find({ query: { cityId: 2844588 } })
    expect(result.name).toBe('Rostock')
    expect(fetchUrl()).toContain('id=2844588')
  })

  it('create by city name', async () => {
    mockFetch(response)
    const result = await service.create({
      cityName: 'Munich',
      stateCode: 'DE',
    })
    expect(result.name).toBe('Munich')
  })

  it('find by geo coordinates', async () => {
    mockFetch({ ...response, name: 'Mitte' })
    const result = await service.find({
      query: { lat: 52.520008, lon: 13.404954 },
    })
    expect(result.name).toBe('Mitte')
    expect(fetchUrl()).toContain('lat=52.520008')
    expect(fetchUrl()).toContain('lon=13.404954')
  })

  it('find by zip code', async () => {
    mockFetch({ ...response, name: 'Rostock' })
    const result = await service.find({
      query: { zipCode: '18057', countryCode: 'DE' },
    })
    expect(result.name).toBe('Rostock')
    expect(fetchUrl()).toContain('zip=18057%2CDE')
  })
})

describe('OneCallService', () => {
  let service: OneCallService

  beforeAll(() => {
    service = new OneCallService({ appid: 'test-key' })
  })

  const response = {
    lat: 52.52,
    lon: 13.405,
    timezone: 'Europe/Berlin',
    timezone_offset: 7200,
    current: {
      dt: 1625000000,
      temp: 293.15,
      feels_like: 292.5,
      pressure: 1013,
      humidity: 65,
      dew_point: 286.15,
      uvi: 5.2,
      clouds: 75,
      visibility: 10000,
      wind_speed: 3.6,
      wind_deg: 220,
      sunrise: 1624935000,
      sunset: 1624993000,
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04d',
        },
      ],
    },
    daily: [{ dt: 1625000000 }],
    hourly: [{ dt: 1625000000 }],
    minutely: [{ dt: 1625000000, precipitation: 0 }],
  }

  it('find by geo coordinates', async () => {
    mockFetch(response)
    const result = await service.find({
      query: { lat: 52.520008, lon: 13.404954 },
    })
    expect(result.current).toBeTruthy()
    expect(result.daily).toBeTruthy()
    expect(result.hourly).toBeTruthy()
    expect(result.minutely).toBeTruthy()
    expect(fetchUrl()).toContain('/3.0/onecall')
  })

  it('create by geo coordinates', async () => {
    mockFetch(response)
    const result = await service.create({ lat: 52.520008, lon: 13.404954 })
    expect(result.current).toBeTruthy()
  })
})

describe('ForecastService', () => {
  let service: ForecastService

  beforeAll(() => {
    service = new ForecastService({ appid: 'test-key' })
  })

  const response = {
    cod: 200,
    message: 0,
    cnt: 40,
    list: [
      {
        dt: 1625000000,
        main: {
          temp: 293.15,
          feels_like: 292.5,
          temp_min: 291.15,
          temp_max: 295.15,
          pressure: 1013,
          sea_level: 1013,
          grnd_level: 1010,
          humidity: 65,
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d',
          },
        ],
        clouds: { all: 75 },
        wind: { speed: 3.6, deg: 220, gust: 5.0 },
        visibility: 10000,
        pop: 0.2,
        sys: { pod: 'd' },
        dt_txt: '2021-06-30 12:00:00',
      },
    ],
    city: {
      id: 2867714,
      name: 'Munich',
      coord: { lat: 48.14, lon: 11.58 },
      country: 'DE',
      timezone: 7200,
      sunrise: 1624935000,
      sunset: 1624993000,
    },
  }

  it('find by city name', async () => {
    mockFetch(response)
    const result = await service.find({
      query: { cityName: 'Munich', stateCode: 'DE' },
    })
    expect(result.city.name).toBe('Munich')
    expect(fetchUrl()).toContain('/3.0/forecast')
  })

  it('find by city id', async () => {
    mockFetch({
      ...response,
      city: { ...response.city, name: 'Rostock' },
    })
    const result = await service.find({ query: { cityId: 2844588 } })
    expect(result.city.name).toBe('Rostock')
  })

  it('create by city name', async () => {
    mockFetch(response)
    const result = await service.create({
      cityName: 'Munich',
      stateCode: 'DE',
    })
    expect(result.city.name).toBe('Munich')
  })

  it('find by geo coordinates', async () => {
    mockFetch({
      ...response,
      city: { ...response.city, name: 'Mitte' },
    })
    const result = await service.find({
      query: { lat: 52.520008, lon: 13.404954 },
    })
    expect(result.city.name).toBe('Mitte')
  })

  it('find by zip code', async () => {
    mockFetch({
      ...response,
      city: { ...response.city, name: 'Rostock' },
    })
    const result = await service.find({
      query: { zipCode: '18057', countryCode: 'DE' },
    })
    expect(result.city.name).toBe('Rostock')
  })
})

describe('HourlyForecastService', () => {
  let service: HourlyForecastService

  beforeAll(() => {
    service = new HourlyForecastService({ appid: 'test-key' })
  })

  it('find hits forecast/hourly endpoint', async () => {
    mockFetch({
      cod: 200,
      message: 0,
      cnt: 0,
      list: [],
      city: { name: 'Munich' },
    })
    await service.find({ query: { cityName: 'Munich' } })
    expect(fetchUrl()).toContain('/3.0/forecast/hourly')
  })
})

describe('DailyForecastService', () => {
  let service: DailyForecastService

  beforeAll(() => {
    service = new DailyForecastService({ appid: 'test-key' })
  })

  it('find hits forecast/daily endpoint', async () => {
    mockFetch({
      cod: 200,
      message: 0,
      cnt: 0,
      list: [],
      city: { name: 'Munich' },
    })
    await service.find({ query: { cityName: 'Munich' } })
    expect(fetchUrl()).toContain('/3.0/forecast/daily')
  })
})

describe('ClimaticForecastService', () => {
  let service: ClimaticForecastService

  beforeAll(() => {
    service = new ClimaticForecastService({ appid: 'test-key' })
  })

  it('find hits forecast/climate endpoint', async () => {
    mockFetch({ cod: 200, city: { name: 'Munich' }, list: [] })
    await service.find({ query: { cityName: 'Munich' } })
    expect(fetchUrl()).toContain('/3.0/forecast/climate')
  })
})

describe('AirPollutionService', () => {
  let service: AirPollutionService

  beforeAll(() => {
    service = new AirPollutionService({ appid: 'test-key' })
  })

  const response = {
    coord: { lat: 52.52, lon: 13.405 },
    list: [
      {
        dt: 1625000000,
        main: { aqi: 2 },
        components: {
          co: 201.94,
          no: 0.01,
          no2: 0.77,
          o3: 68.66,
          so2: 0.64,
          pm2_5: 0.5,
          pm10: 0.54,
          nh3: 0.12,
        },
      },
    ],
  }

  it('find (current)', async () => {
    mockFetch(response)
    const result = await service.find({
      query: { lat: 52.520008, lon: 13.404954 },
    })
    expect(result.coord).toEqual({ lat: 52.52, lon: 13.405 })
    expect(result.list.length).toBe(1)
    expect(result.list[0].main.aqi).toBeGreaterThanOrEqual(1)
    expect(result.list[0].main.aqi).toBeLessThanOrEqual(5)
    expect(fetchUrl()).toContain('/3.0/air_pollution')
  })

  it('create (current)', async () => {
    mockFetch(response)
    const result = await service.create({ lat: 52.520008, lon: 13.404954 })
    expect(result.coord).toEqual({ lat: 52.52, lon: 13.405 })
    expect(result.list.length).toBe(1)
  })

  it('forecast', async () => {
    const forecastResponse = {
      ...response,
      list: Array.from({ length: 5 }, (_, i) => ({
        ...response.list[0],
        dt: 1625000000 + i * 3600,
      })),
    }
    mockFetch(forecastResponse)
    const result = await service.forecast({ lat: 52.520008, lon: 13.404954 })
    expect(result.coord).toEqual({ lat: 52.52, lon: 13.405 })
    expect(result.list.length).toBe(5)
    expect(fetchUrl()).toContain('air_pollution/forecast')
  })

  it('historical', async () => {
    const historicalResponse = {
      ...response,
      list: Array.from({ length: 61 }, (_, i) => ({
        ...response.list[0],
        dt: 1606223802 + i * 3600,
      })),
    }
    mockFetch(historicalResponse)
    const result = await service.historical({
      lat: 52.520008,
      lon: 13.404954,
      start: 1606223802,
      end: 1606482999,
    })
    expect(result.coord).toEqual({ lat: 52.52, lon: 13.405 })
    expect(result.list.length).toBe(61)
    expect(fetchUrl()).toContain('air_pollution/history')
  })
})

describe('error handling', () => {
  let service: WeatherService

  beforeAll(() => {
    service = new WeatherService({ appid: 'test-key' })
  })

  it('throws on non-ok response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        text: () => Promise.resolve('{"cod":401,"message":"Invalid API key"}'),
      }),
    )
    await expect(service.create({ cityName: 'Munich' })).rejects.toThrow()
  })

  it('throws on network error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network error')),
    )
    await expect(service.create({ cityName: 'Munich' })).rejects.toThrow()
  })
})

describe('URL construction', () => {
  let service: WeatherService

  beforeAll(() => {
    service = new WeatherService({ appid: 'test-key' })
  })

  it('uses correct base URL and default version', async () => {
    mockFetch({ name: 'Test' })
    await service.create({ cityName: 'Test' })
    expect(fetchUrl()).toContain(
      'https://api.openweathermap.org/data/3.0/weather',
    )
  })

  it('allows overriding version per request', async () => {
    mockFetch({ name: 'Test' })
    await service.create({ cityName: 'Test', v: '2.5' })
    expect(fetchUrl()).toContain('/2.5/weather')
  })

  it('includes appid in query params', async () => {
    mockFetch({ name: 'Test' })
    await service.create({ cityName: 'Test' })
    expect(fetchUrl()).toContain('appid=test-key')
  })
})
