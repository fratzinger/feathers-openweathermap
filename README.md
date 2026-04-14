# feathers-openweathermap

![npm](https://img.shields.io/npm/v/feathers-openweathermap)
![npm](https://img.shields.io/npm/dm/feathers-openweathermap)
[![GitHub license](https://img.shields.io/github/license/fratzinger/feathers-openweathermap)](https://github.com/fratzinger/feathers-openweathermap/blob/main/LICENSE)

> An [OpenWeatherMap API](https://openweathermap.org/api) service for [Feathers 5](https://feathersjs.com) applications. Supports current weather, forecasts, one call, and air pollution data.

## Supported APIs
- [Current weather](https://openweathermap.org/current) (*free*) - `WeatherService`
- [One Call 3.0](https://openweathermap.org/api/one-call-3) (*free tier: 1,000 calls/day*) - `OneCallService`
- [5 Day / 3 Hour Forecast](https://openweathermap.org/forecast5) (*free*) - `ForecastService`
- [Hourly forecast](https://openweathermap.org/api/hourly-forecast) (*paid*) - `HourlyForecastService`
- [Daily forecast](https://openweathermap.org/forecast16) (*paid*) - `DailyForecastService`
- [Climatic forecast](https://openweathermap.org/api/forecast30) (*paid*) - `ClimaticForecastService`
- [Air pollution](https://openweathermap.org/api/air-pollution) (*free*) - `AirPollutionService`

## Installation

```bash
pnpm add feathers-openweathermap
```

## Get your appid
Follow the instructions at: https://openweathermap.org/appid

## Setup

Each API endpoint has its own dedicated service. Register only the ones you need:

```ts
import {
  WeatherService,
  OneCallService,
  ForecastService,
  AirPollutionService,
} from 'feathers-openweathermap'

const options = { appid: 'YOUR_APP_ID' }

app.use('openweathermap/weather', new WeatherService(options))
app.use('openweathermap/onecall', new OneCallService(options))
app.use('openweathermap/forecast', new ForecastService(options))
app.use('openweathermap/air-pollution', new AirPollutionService(options))
```

### Service options
- `appid` (**required**) - your appid from [openweathermap.org](https://openweathermap.org/guide)
- `v` (*optional*, default: `'3.0'`) - the API version
- `mode` (*optional*, default: `'json'`) - the results format (`'json'`, `'xml'`, `'html'`)
- `lang` (*optional*, default: `'en'`) - the language of the result. [info](https://openweathermap.org/current#multi)
- `units` (*optional*, default: `'standard'`) - Units of measurement. `'standard'`, `'metric'` and `'imperial'` units are available.

## Services

Each service exposes `find(params)` and `create(data)`. They are functionally equivalent. `create()` is useful for taking advantage of the `.on('created')` service event.

### WeatherService

```ts
// find with query
app.service('openweathermap/weather').find({
  query: { cityName: 'Munich', stateCode: 'DE' },
})

// or create with data
app.service('openweathermap/weather').create({ cityId: 2844588 })
```

### OneCallService

```ts
app.service('openweathermap/onecall').find({
  query: { lat: 52.520008, lon: 13.404954 },
})
```

### ForecastService

```ts
app.service('openweathermap/forecast').find({
  query: { cityName: 'Munich', stateCode: 'DE' },
})
```

### HourlyForecastService / DailyForecastService / ClimaticForecastService

```ts
import { HourlyForecastService, DailyForecastService, ClimaticForecastService } from 'feathers-openweathermap'

app.use('openweathermap/forecast-hourly', new HourlyForecastService(options))
app.use('openweathermap/forecast-daily', new DailyForecastService(options))
app.use('openweathermap/forecast-climate', new ClimaticForecastService(options))
```

### AirPollutionService

`find()` and `create()` return current air pollution. Additional methods `forecast()` and `historical()` are available:

```ts
// current
app.service('openweathermap/air-pollution').find({
  query: { lat: 52.520008, lon: 13.404954 },
})

// forecast
app.service('openweathermap/air-pollution').forecast({
  lat: 52.520008,
  lon: 13.404954,
})

// historical
app.service('openweathermap/air-pollution').historical({
  lat: 52.520008,
  lon: 13.404954,
  start: 1606223802,
  end: 1606482999,
})
```

## Location query options

All weather/forecast endpoints support these location methods:

| Method | Parameters |
|--------|-----------|
| City name | `cityName`, `stateCode?`, `countryCode?` |
| City ID | `cityId` |
| Coordinates | `lat`, `lon` |
| Zip code | `zipCode`, `countryCode?` |

OneCall and AirPollution only support coordinates (`lat`, `lon`).

## Testing

```bash
pnpm test
```

Tests use mocked fetch responses and run without an API key.

## License

Licensed under the [MIT license](LICENSE).
