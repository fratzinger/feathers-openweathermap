# feathers-openweathermap

> Ever needed weather information in your [feathers.js](www.feathersjs.com) app? No matter if historical, current or forecast data. This is thin layer around the [OpenWeatherMap API](https://openweathermap.org/api) wrapped in a `feathers.js` service. 

![npm](https://img.shields.io/npm/v/feathers-openweathermap)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/fratzinger/feathers-openweathermap/Node.js%20CI)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/fratzinger/feathers-openweathermap)
![Code Climate coverage](https://img.shields.io/codeclimate/coverage/fratzinger/feathers-openweathermap)
![David](https://img.shields.io/david/fratzinger/feathers-openweathermap)
![npm](https://img.shields.io/npm/dm/feathers-openweathermap)
[![GitHub license](https://img.shields.io/github/license/fratzinger/feathers-openweathermap)](https://github.com/fratzinger/feathers-openweathermap/blob/master/LICENSE)

## Installation

```bash
npm i feathers-openweathermap
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

#### [current weather](https://openweathermap.org/current):
```js
app.service('weather').find({ 
  query: { 
    endpoint: 'weather', 
    cityId: 2844588 
  } 
});
```

#### [onecall](https://openweathermap.org/api/one-call-api):
```js
app.service('weather').find({ 
  query: { 
    endpoint: 'onecall', 
    lat: 52.520008, 
    lon: 13.404954
  } 
});
```

### `create(data)`

#### [current weather](https://openweathermap.org/current)
```js
app.service('weather').create({ 
  endpoint: 'weather',
  cityId: 2844588
});
```

#### [onecall](https://openweathermap.org/api/one-call-api):
```js
app.service('weather').create({ 
  endpoint: 'onecall', 
  lat: 52.520008, 
  lon: 13.404954
});
```

### `currentWeatherData(data)`
```js
app.service('weather').currentWeatherData({ 
  cityId: 2844588
});
```

#### `oneCall(data)`
```js
app.service('weather').oneCall({
  lat: 52.520008,
  lon: 13.404954
});
```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run. This project is setup with vscode. You can use the debugger with breakpoints. To run tests locally, you'll need your own `appid`. You can get it here: https://openweathermap.org/appid. Add a `.env` file with:
```shell
APPID = YOUR_APP_ID
```

## License

Licensed under the [MIT license](LICENSE).