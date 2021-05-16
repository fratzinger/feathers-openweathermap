# feathers-openweathermap

![npm](https://img.shields.io/npm/v/feathers-openweathermap)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/fratzinger/feathers-openweathermap/Node.js%20CI)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/fratzinger/feathers-openweathermap)
![Code Climate coverage](https://img.shields.io/codeclimate/coverage/fratzinger/feathers-openweathermap)
![David](https://img.shields.io/david/fratzinger/feathers-openweathermap)
![npm](https://img.shields.io/npm/dm/feathers-openweathermap)
[![GitHub license](https://img.shields.io/github/license/fratzinger/feathers-openweathermap)](https://github.com/fratzinger/feathers-openweathermap/blob/master/LICENSE)

> Ever needed weather information in your [feathers.js](www.feathersjs.com) app? No matter if historical, current or forecast data. This is thin layer around the [OpenWeatherMap API](https://openweathermap.org/api) wrapped in a `feathers.js` service. 

## Supported APIs
- [Current weather](https://openweathermap.org/current) (*free*)
- [Onecall](https://openweathermap.org/api/one-call-api) (*free*)
- [Forecast](https://openweathermap.org/forecast5) (*free*)
- [Hourly forecast](https://openweathermap.org/api/hourly-forecast) (*Included in the Developer, Professional and Enterprise subscription plans*)
- [Daily forecast](https://openweathermap.org/forecast16) (*Included in all paid subscription plans*)
- [Climatic forecast](https://openweathermap.org/api/forecast30) (*Included in the Developer, Professional and Enterprise subscription plans*)

## Installation

```bash
npm install feathers-openweathermap
```

## Get your appid
Follow the instructions at: https://openweathermap.org/appid

## Creating a service

```js
const { Service } = require('feathers-openweathermap');

app.use("/weather", new Service({
  appid: "YOUR_APP_ID",
}))
```

### Service options
- `appid` (**required**) - your appid from [openweathermap.org](https://openweathermap.org/guide)
- `v` (*optional*, default: `'2.5'`) - the version of openweathermap
- `mode` (*optional*, default: `'json'`) - the results format (possible: `'json'`, `'xml'`, `'html'`)
- `lang` (*optional*, default: `'en'`) - the language of the result. [info](https://openweathermap.org/current#multi)
- `units` (*optional*, default: `'standard'`) - Units of measurement. `'standard'`, `'metric'` and `'imperial'` units are available.

## Methods

The service exposes two standard methods, `find(params)` and `create(data, params)` and custom methods for `@feathersjs/feathers@5`. These methods are functionally equivalent. The `create()` method is added so that you can take advantage of the `.on('created')` service event.

When using the `find(params)` method, include the query as the params to be passed to the underlying OpenWeatherMap method.

### `find(params)`

#### [Current weather](https://openweathermap.org/current)
```js
// by city name https://openweathermap.org/current#name
app.service('weather').find({ 
  query: { 
    endpoint: 'weather', 
    cityName: "Munich", 
    stateCode: "DE"
  }
});

// by city id https://openweathermap.org/current#cityid
app.service('weather').find({ 
  query: { 
    endpoint: 'weather', 
    cityId: 2844588 
  } 
});

// by geo coordinates https://openweathermap.org/current#geo
app.service('weather').find({ 
  query: { 
    endpoint: 'weather', 
    lat: 52.520008
    lon: 13.404954
  } 
});

// by zip code https://openweathermap.org/current#zip
app.service('weather').find({ 
  query: { 
    endpoint: 'weather', 
    zipCode: "18057", 
    countryCode: "DE"
  } 
});
```

#### [Onecall](https://openweathermap.org/api/one-call-api)
```js
app.service('weather').find({ 
  query: { 
    endpoint: 'onecall', 
    lat: 52.520008, 
    lon: 13.404954
  } 
});
```

#### [Forecast](https://openweathermap.org/forecast5)

```js
// by city name https://openweathermap.org/forecast5#name5
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast', 
    cityName: "Munich", 
    stateCode: "DE"
  }
});

// by city id https://openweathermap.org/forecast5#cityid5
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast', 
    cityId: 2844588 
  } 
});

// by geo coordinates https://openweathermap.org/forecast5#geo5
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast', 
    lat: 52.520008,
    lon: 13.404954
  } 
});

// by zip code https://openweathermap.org/forecast5#zip
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast', 
    zipCode: "18057", 
    countryCode: "DE"
  } 
});
```

#### [Hourly forecast](https://openweathermap.org/api/hourly-forecast)

```js
// by city name https://openweathermap.org/api/hourly-forecast#name5
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast/hourly', 
    cityName: "Munich", 
    stateCode: "DE"
  }
});

// by city id https://openweathermap.org/api/hourly-forecast#cityid5
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast/hourly', 
    cityId: 2844588 
  } 
});

// by geo coordinates https://openweathermap.org/api/hourly-forecast#geo5
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast/hourly', 
    lat: 52.520008,
    lon: 13.404954
  } 
});

// by zip code https://openweathermap.org/api/hourly-forecast#zip
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast/hourly', 
    zipCode: "18057", 
    countryCode: "DE"
  } 
});
```

#### [Daily forecast](https://openweathermap.org/forecast16)
```js
// by city name https://openweathermap.org/forecast16#name16
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast/daily', 
    cityName: "Munich", 
    stateCode: "DE"
  }
});

// by city id https://openweathermap.org/forecast16#cityid16
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast/daily', 
    cityId: 2844588 
  } 
});

// by geo coordinates https://openweathermap.org/forecast16#geo16
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast/daily', 
    lat: 52.520008,
    lon: 13.404954
  } 
});

// by zip code https://openweathermap.org/forecast16#zip
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast/daily', 
    zipCode: "18057", 
    countryCode: "DE"
  } 
});
```

#### [Climatic forecast](https://openweathermap.org/api/forecast30)

```js
// by city name https://openweathermap.org/api/forecast30#name-year
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast/climatic', 
    cityName: "Munich", 
    stateCode: "DE"
  }
});

// by city id https://openweathermap.org/api/forecast30#cityid-year
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast/climatic', 
    cityId: 2844588 
  } 
});

// by geo coordinates https://openweathermap.org/api/forecast30#geo-year
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast/climatic', 
    lat: 52.520008,
    lon: 13.404954
  } 
});

// by zip code https://openweathermap.org/api/forecast30#zip-year
app.service('weather').find({ 
  query: { 
    endpoint: 'forecast/climatic', 
    zipCode: "18057", 
    countryCode: "DE"
  } 
});
```


### `create(data)`

#### [Current weather](https://openweathermap.org/current)
```js
// by city name https://openweathermap.org/current#name
app.service('weather').create({ 
  endpoint: 'weather', 
  cityName: "Munich", 
  stateCode: "DE"
});

// by city id https://openweathermap.org/current#cityid
app.service('weather').create({ 
  endpoint: 'weather',
  cityId: 2844588
});

// by geo coordinates https://openweathermap.org/current#geo
app.service('weather').create({ 
  endpoint: 'weather', 
  lat: 52.520008,
  lon: 13.404954
});

// by zip code https://openweathermap.org/current#zip
app.service('weather').create({ 
  endpoint: 'weather', 
  zipCode: "18057", 
  countryCode: "DE"
});
```

#### [Onecall](https://openweathermap.org/api/one-call-api)
```js
app.service('weather').create({ 
  endpoint: 'onecall', 
  lat: 52.520008, 
  lon: 13.404954
});
```

#### [Forecast](https://openweathermap.org/forecast5)

```js
// by city name https://openweathermap.org/forecast5#name5
app.service('weather').create({ 
  endpoint: 'forecast', 
  cityName: "Munich", 
  stateCode: "DE"
});

// by city id https://openweathermap.org/forecast5#cityid5
app.service('weather').create({ 
  endpoint: 'forecast', 
  cityId: 2844588 
});

// by geo coordinates https://openweathermap.org/forecast5#geo5
app.service('weather').create({ 
  endpoint: 'forecast', 
  lat: 52.520008,
  lon: 13.404954 
});

// by zip code https://openweathermap.org/forecast5#zip
app.service('weather').create({ 
  endpoint: 'forecast', 
  zipCode: "18057", 
  countryCode: "DE" 
});
```

#### [Hourly forecast](https://openweathermap.org/api/hourly-forecast)

```js
// by city name https://openweathermap.org/api/hourly-forecast#name5
app.service('weather').create({ 
  endpoint: 'forecast/hourly', 
  cityName: "Munich", 
  stateCode: "DE"
});

// by city id https://openweathermap.org/api/hourly-forecast#cityid5
app.service('weather').create({ 
  endpoint: 'forecast/hourly', 
  cityId: 2844588  
});

// by geo coordinates https://openweathermap.org/api/hourly-forecast#geo5
app.service('weather').create({ 
  endpoint: 'forecast/hourly', 
  lat: 52.520008,
  lon: 13.404954 
});

// by zip code https://openweathermap.org/api/hourly-forecast#zip
app.service('weather').create({ 
  endpoint: 'forecast/hourly', 
  zipCode: "18057", 
  countryCode: "DE" 
});
```

#### [Daily forecast](https://openweathermap.org/forecast16)
```js
// by city name https://openweathermap.org/forecast16#name16
app.service('weather').create({ 
  endpoint: 'forecast/daily', 
  cityName: "Munich", 
  stateCode: "DE"
});

// by city id https://openweathermap.org/forecast16#cityid16
app.service('weather').create({ 
  endpoint: 'forecast/daily', 
  cityId: 2844588 
});

// by geo coordinates https://openweathermap.org/forecast16#geo16
app.service('weather').create({ 
  endpoint: 'forecast/daily', 
  lat: 52.520008,
  lon: 13.404954 
});

// by zip code https://openweathermap.org/forecast16#zip
app.service('weather').create({ 
  endpoint: 'forecast/daily', 
  zipCode: "18057", 
  countryCode: "DE" 
});
```

#### [Climatic forecast](https://openweathermap.org/api/forecast30)

```js
// by city name https://openweathermap.org/api/forecast30#name-year
app.service('weather').create({ 
  endpoint: 'forecast/climatic', 
  cityName: "Munich", 
  stateCode: "DE"
});

// by city id https://openweathermap.org/api/forecast30#cityid-year
app.service('weather').create({ 
  endpoint: 'forecast/climatic', 
  cityId: 2844588 
});

// by geo coordinates https://openweathermap.org/api/forecast30#geo-year
app.service('weather').create({ 
  endpoint: 'forecast/climatic', 
  lat: 52.520008
  lon: 13.404954 
});

// by zip code https://openweathermap.org/api/forecast30#zip-year
app.service('weather').create({ 
  endpoint: 'forecast/climatic', 
  zipCode: "18057", 
  countryCode: "DE" 
});
```
### `currentWeatherData(data)`

```js
app.service('weather').currentWeatherData({ 
  cityId: 2844588
});
```

### `oneCall(data)`

```js
app.service('weather').oneCall({
  lat: 52.520008,
  lon: 13.404954
});
```

### `fiveDay3HourForecast(data)`

```js
app.service('weather').fiveDay3HourForecast({
  cityName: "Munich", 
  stateCode: "DE", 
  countryCode: "DE"
})
```

### `hourlyForecast4Days(data)`

```js
app.service('weather').hourlyForecast4Days({
  cityName: "Munich", 
  stateCode: "DE", 
  countryCode: "DE"
})
```

### `dailyForecast16Days(data)`

```js
app.service('weather').dailyForecast16Days({
  cityName: "Munich", 
  stateCode: "DE", 
  countryCode: "DE"
})
```

### `climaticForecast30Days(data)`

```js
app.service('weather').climaticForecast30Days({
  cityName: "Munich", 
  stateCode: "DE", 
  countryCode: "DE"
})
```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run. This project is setup with vscode. You can use the debugger with breakpoints. To run tests locally, you'll need your own `appid`. You can get it here: https://openweathermap.org/appid. Add a `.env` file with:
```shell
APPID = YOUR_APP_ID
```

## License

Licensed under the [MIT license](LICENSE).