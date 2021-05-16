import { FixedLengthArray } from "type-fest";

//#region general

export interface OWMServiceOptions {
  appid: string
  v: string
  lang: Lang
  mode: Mode
  units: Unit
}

export interface WithAppId {
  appid: string
}

export interface WithV {
  v: string
}

export interface QueryByCityName {
  q: string
}

export interface QueryByCityId {
  id: number
}

export interface QueryByGeoCoordinates {
  lat: Latitude
  lon: Longitude
}

export interface QueryByZipCode {
  zip: string
}

export type QueryParams = QueryByCityId & QueryByCityName & QueryByGeoCoordinates & QueryByZipCode & WithAppId & WithLangModeUnits

export interface WithLang {
  lang: Lang
}

export interface WithMode {
  mode: Mode
}

export interface WithUnits {
  units: Unit
}

export type WithLangModeUnits =
  WithLang & WithMode & WithUnits;

export interface ByCityName {
  cityName: string
  stateCode?: string
  countryCode?: string
}

export interface ByCityId {
  cityId: number
}

export interface ByGeoGraphicCoordinates {
  lat: Latitude
  lon: Longitude
}

export interface ByZipCode {
  zipCode: string
  countryCode?: string
}

export type Endpoint = 
  "weather" | 
  "forecast/hourly" | 
  "onecall" | 
  "forecast/daily" | 
  "forecast/climate" |
  "forecast";

export type Unit = "standard" | "metric" | "imperial";
export type Mode = "json" | "html" | "xml";

export type Kelvin = number;
export type Celsius = number;
export type Fahrenheit = number;

export type Longitude = number;
export type Latitude = number;

export type Lang = "af" | "al" | "ar" | "az" | "bg" | "ca" |
"cz" | "da" | "de" | "el" | "en" | "eu" | "fa" | "fi" | "fr" |
"gl" | "he" | "hi" | "hr" | "hu" | "id" | "it" | "ja" | "kr" |
"la" | "lt" | "mk" | "no" | "nl" | "pl" | "pt" | "pt_br" |
"ro" | "ru" | "sv, se" | "sk" | "sl" | "sp, es" | "sr" | "th" |
"tr" | "ua, uk" | "vi" | "zh_cn" | "zh_tw" | "zu";

export type WeatherCondition = {
  id: 200
  main: "Thunderstorm"
  description: "thunderstorm with light rain"
  icon: "11d" | "11n"
} | {
  id: 201,
  main: "Thunderstorm"
  description: "thunderstorm with rain"
  icon: "11d" | "11n"
} | {
  id: 202,
  main: "Thunderstorm"
  description: "thunderstorm with heavy rain"
  icon: "11d" | "11n"
} | {
  id: 210,
  main: "Thunderstorm"
  description: "light thunderstorm"
  icon: "11d" | "11n"
} | {
  id: 211,
  main: "Thunderstorm"
  description: "thunderstorm"
  icon: "11d" | "11n"
} | {
  id: 212,
  main: "Thunderstorm"
  description: "heavy thunderstorm"
  icon: "11d" | "11n"
} | {
  id: 221,
  main: "Thunderstorm"
  description: "ragged thunderstorm"
  icon: "11d" | "11n"
} | {
  id: 230,
  main: "Thunderstorm"
  description: "thunderstorm with light drizzle"
  icon: "11d" | "11n"
} | {
  id: 231,
  main: "Thunderstorm"
  description: "thunderstorm with drizzle"
  icon: "11d" | "11n"
} | {
  id: 232,
  main: "Thunderstorm"
  description: "thunderstorm with heavy drizzle"
  icon: "11d" | "11n"
} | {
  id: 300,
  main: "Drizzle"
  description: "light intensity drizzle"
  icon: "09d" | "09n"
} | {
  id: 301,
  main: "Drizzle"
  description: "drizzle"
  icon: "09d" | "09n"
} | {
  id: 302,
  main: "Drizzle"
  description: "heavy intensity drizzle"
  icon: "09d" | "09n"
} | {
  id: 310,
  main: "Drizzle"
  description: "light intensity drizzle rain"
  icon: "09d" | "09n"
} | {
  id: 311,
  main: "Drizzle"
  description: "drizzle rain"
  icon: "09d" | "09n"
} | {
  id: 312,
  main: "Drizzle"
  description: "heavy intensity drizzle rain"
  icon: "09d" | "09n"
} | {
  id: 313,
  main: "Drizzle"
  description: "shower rain and drizzle"
  icon: "09d" | "09n"
} | {
  id: 314,
  main: "Drizzle"
  description: "heavy shower rain and drizzle"
  icon: "09d" | "09n"
} | {
  id: 321,
  main: "Drizzle"
  description: "shower drizzle"
  icon: "09d" | "09n"
} | {
  id: 500,
  main: "Rain"
  description: "light rain"
  icon: "10d" | "10n"
} | {
  id: 501,
  main: "Rain"
  description: "moderate rain"
  icon: "10d" | "10n"
} | {
  id: 502,
  main: "Rain"
  description: "heavy intensity rain"
  icon: "10d" | "10n"
} | {
  id: 503,
  main: "Rain"
  description: "very heavy rain"
  icon: "10d" | "10n"
} | {
  id: 504,
  main: "Rain"
  description: "extreme rain"
  icon: "10d" | "10n"
} | {
  id: 511,
  main: "Rain"
  description: "freezing rain"
  icon: "13d" | "13n"
} | {
  id: 520,
  main: "Rain"
  description: "light intensity shower rain"
  icon: "09d" | "09n"
} | {
  id: 521,
  main: "Rain"
  description: "shower rain"
  icon: "09d" | "09n"
} | {
  id: 522,
  main: "Rain"
  description: "heavy intensity shower rain"
  icon: "09d" | "09n"
} | {
  id: 531,
  main: "Rain"
  description: "ragged shower rain"
  icon: "09d" | "09n"
} | {
  id: 600,
  main: "Snow"
  description: "light snow"
  icon: "13d" | "13n"
} | {
  id: 601,
  main: "Snow"
  description: "Snow"
  icon: "13d" | "13n"
} | {
  id: 602,
  main: "Snow"
  description: "Heavy snow"
  icon: "13d" | "13n"
} | {
  id: 611,
  main: "Snow"
  description: "Sleet"
  icon: "13d" | "13n"
} | {
  id: 612,
  main: "Snow"
  description: "Light shower sleet"
  icon: "13d" | "13n"
} | {
  id: 613,
  main: "Snow"
  description: "Shower sleet"
  icon: "13d" | "13n"
} | {
  id: 615,
  main: "Snow"
  description: "Light rain and snow"
  icon: "13d" | "13n"
} | {
  id: 616,
  main: "Snow"
  description: "Rain and snow"
  icon: "13d" | "13n"
} | {
  id: 620,
  main: "Snow"
  description: "Light shower snow"
  icon: "13d" | "13n"
} | {
  id: 621,
  main: "Snow"
  description: "Shower snow"
  icon: "13d" | "13n"
} | {
  id: 622,
  main: "Snow"
  description: "Heavy shower snow"
  icon: "13d" | "13n"
} | {
  id: 701,
  main: "Mist"
  description: "mist"
  icon: "50d" | "50n"
} | {
  id: 711,
  main: "Smoke"
  description: "Smoke"
  icon: "50d" | "50n"
} | {
  id: 721,
  main: "Haze"
  description: "Haze"
  icon: "50d" | "50n"
} | {
  id: 731,
  main: "Dust"
  description: "sand/ dust whirls"
  icon: "50d" | "50n"
} | {
  id: 741,
  main: "Fog"
  description: "fog"
  icon: "50d" | "50n"
} | {
  id: 751,
  main: "Sand"
  description: "sand"
  icon: "50d" | "50n"
} | {
  id: 761,
  main: "Dust"
  description: "dust"
  icon: "50d" | "50n"
} | {
  id: 762,
  main: "Ash"
  description: "volcanic ash"
  icon: "50d" | "50n"
} | {
  id: 771,
  main: "Squall"
  description: "squalls"
  icon: "50d" | "50n"
} | {
  id: 781,
  main: "Tornado"
  description: "tornado"
  icon: "50d" | "50n"
} | {
  id: 800,
  main: "Clear"
  description: "clear sky"
  icon: "01d" | "01n"
} | {
  id: 801,
  main: "Clouds"
  description: "few clouds"
  icon: "02d" | "02n"
} | {
  id: 802,
  main: "Clouds"
  description: "scattered clouds"
  icon: "03d" | "03n"
} | {
  id: 803,
  main: "Clouds"
  description: "broken clouds"
  icon: "04d" | "04n"
} | {
  id: 804,
  main: "Clouds"
  description: "overcast clouds"
  icon: "04d" | "04n"
};

//#endregion

export type T = number;

export type AnyData = 
  CurrentWeatherDataData | 
  OneCallData |
  DailyForecast16DaysData |
  ClimaticForeCast30DaysData |
  FiveDay3HourForecastData |
  HourlyForecast4DaysData;

export type AnyResult = 
  CurrentWeatherDataResult | 
  OneCallResult |
  DailyForecast16DaysResult |
  ClimaticForeCast30DaysResult |
  FiveDay3HourForecastResult |
  HourlyForecast4DaysResult;


//#region daily forecast 16 days

export type DailyForecast16DaysData = 
  (ByCityName | ByCityId | ByGeoGraphicCoordinates | ByZipCode) &
  Partial<WithAppId & WithV & WithLangModeUnits> & 
  { cnt?: number };

export interface DailyForecast16DaysResult {
  city: {
    id: number
    name: string
    coord: {
      lat: Latitude
      lon: Longitude
    }
    country: string
    population: number
    timezone: number
  }
  cod: number
  message: number
  cnt: number
  list: {
    dt: number
    sunrise: number
    sunset: number
    temp: {
      day: T
      min: T
      max: T
      night: T
      eve: T
      morn: T
    }
    feels_like: {
      day: T
      night: T
      eve: T
      morn: T
    }
    pressure: number
    humidity: number
    weather: [WeatherCondition]
    speed: number
    deg: number
    gust: number
    clouds: number
    pop: number
  }[]
}

//#endregion

//#region climatic forecast 30 days

export type ClimaticForeCast30DaysData =
  (ByCityName | ByCityId | ByGeoGraphicCoordinates | ByZipCode) &
  Partial<WithAppId & WithV & WithLangModeUnits> & 
  { cnt?: number };

export interface ClimaticForeCast30DaysResult {
  cod: number
  city: {
    id: number
    name: string
    coord: {
      lat: Latitude
      lon: Longitude
    }
    country: string
  }
  message: string
  list: {
    dt: number
    sunrise: number
    sunset: number
    temp: {
      day: T
      min: T
      max: T
      night: T
      eve: T
      morn: T
    }
    pressure: number
    humidity: number
    weather: [WeatherCondition]
    speed: number
    deg: number
    clouds: number
    rain: number
  }[]
}

//#endregion

//#region 5 day / 3 hour forecast

export type FiveDay3HourForecastData =
  (ByCityName | ByCityId | ByGeoGraphicCoordinates | ByZipCode) &
  Partial<WithAppId & WithV & WithLangModeUnits> & 
  { cnt?: number };

export interface FiveDay3HourForecastResult {
  cod: number
  message: number
  cnt: number
  list: {
    dt: number
    main: {
      temp: T
      feels_like: T
      temp_min: T
      temp_max: T
      pressure: number
      sea_level: number
      grnd_level: number
      humidity: number
    }
    weather: [WeatherCondition]
    clouds: {
      all: number
    }
    wind: {
      speed: number
      deg: number
      gust: number
    }
    visibility: number
    pop: number
    rain?: {
      "3h": number
    }
    snow?: {
      "3h": number
    }
    sys: {
      pod: "d" | "n"
    }
    dt_txt: string
  }[]
  city: {
    id: number
    name: string
    coord: {
      lat: Latitude
      lon: Longitude
    }
    country: string
    timezone: number
    sunrise: number
    sunset: number
  }
}

//#endregion

//#region hourly forecast 4 days

export type HourlyForecast4DaysData = 
  (ByCityName | ByCityId | ByGeoGraphicCoordinates | ByZipCode) &
  Partial<WithAppId & WithV & WithLangModeUnits> & 
  { cnt?: number };

export interface HourlyForecast4DaysResult {
  cod: number
  message: number
  cnt: number
  list: {
    dt: number
    main: {
      temp: T
      feels_like: T
      temp_min: T
      temp_max: T
      pressure: number
      sea_level: number
      grnd_level: number
      humidity: number
      temp_kf: number
    }
    weather: [WeatherCondition]
    clouds: {
      all: number
    }
    wind: {
      speed: number
      deg: number
      gust: number
    }
    visibility: number
    pop: number
    sys: {
      pod: string
    }
    dt_txt: string
  }[]
  city: {
    id: number
    name: string
    coord: {
      lat: Latitude
      lon: Longitude
    }
    country: string
    timezone: number
    sunrise: number
    sunset: number
  }
}

//#endregion

//#region onecall

export type OneCallData = 
  ByGeoGraphicCoordinates &
  { exclude?: ("current"|"minutely"|"hourly"|"daily"|"alerts")[] } &
  Partial<WithAppId & WithV & WithLangModeUnits>;

export interface OneCallResult {
  current: OneCallResultCurrent
  daily: FixedLengthArray<OneCallResultDaily, 8>
  hourly: FixedLengthArray<OneCallResultHourly, 48>
  lat: Latitude
  lon: Longitude
  minutely: FixedLengthArray<OneCallResultMinutely, 61>
  timezone: string
  timezone_offset: number
}

export interface OneCallResultCurrent {
  clouds: number
  dew_point: number
  dt: number
  feels_like: number
  humidity: number
  pressure: number
  sunrise: number
  sunset: number
  temp: number
  uvi: number
  visibility: number
  weather: [WeatherCondition]
  wind_deg: number
  wind_speed: number
}

export interface OneCallResultDaily {
  clouds: number
  dew_point: number
  dt: number
  feels_like: {
    day: number
    eve: number
    morn: number
    night: number
  }
  humidity: number
  moon_phase: number
  moonrise: number
  moonset: number
  pop: number
  pressure: number
  rain: number
  sunrise: number
  sunset: number
  temp: {
    day: number
    eve: number
    max: number
    min: number
    morn: number
    night: number
  }
  uvi: number
  weather: [WeatherCondition]
  wind_deg: number
  wind_gust: number
  wind_speed: number
}

export interface OneCallResultHourly {
  clouds: number
  dew_point: number
  dt: number
  feels_like: number
  humidity: number
  pop: number
  pressure: number
  temp: number
  uvi: number
  visibility: number
  weather: [WeatherCondition]
  wind_deg: number
  wind_gust: number
  wind_speed: number
}

export interface OneCallResultMinutely {
  dt: number
  precipitation: number
}

//#endregion

//#region current weather

export type CurrentWeatherDataData = 
  (ByCityName | ByCityId | ByGeoGraphicCoordinates | ByZipCode) &
  Partial<WithAppId & WithV & WithLang & WithUnits>;

export interface CurrentWeatherDataResult {
  base: string
  clouds: {
    all: number
  }
  cod: number
  coord: {
    lon: Longitude
    lat: Latitude
  },
  dt: number
  id: number
  main: {
    temp: T
    feels_like: T
    temp_min: T
    temp_max: T
    pressure: number
    humidity: number
  }
  name: string
  rain?: {
    "1h"?: number
    "3h"?: number
  }
  snow?: {
    "1h"?: number
    "3h"?: number
  }
  sys: {
    type: number
    id: number
    message: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  visibility: number
  weather: [WeatherCondition]
  wind: {
    deg: number
    speed: number
  }
}

//#endregion



