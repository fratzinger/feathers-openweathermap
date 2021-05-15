import { FixedLengthArray } from "type-fest";

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
  "forecast/climate";

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

export type HourlyForecast4DaysData = 
  (ByCityName | ByCityId | ByGeoGraphicCoordinates | ByZipCode) &
  Partial<WithAppId> & 
  Partial<WithV> & 
  Partial<WithLangModeUnits> &
  { cnt?: number };

export interface HourlyForecast4DaysResult {
  appid: string
}

export type AnyData = CurrentWeatherDataData | OneCallData;

export type AnyResult = CurrentWeatherDataResult | OneCallResult;

export type OneCallData = 
  ByGeoGraphicCoordinates &
  { exclude?: ("current"|"minutely"|"hourly"|"daily"|"alerts")[] } &
  Partial<WithAppId & WithV & WithLangModeUnits>;

export type CurrentWeatherDataData = 
  (ByCityName | ByCityId | ByGeoGraphicCoordinates | ByZipCode) &
  Partial<WithAppId & WithV & WithLang & WithUnits>;

export type T = number;

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
  weather: [{
    id: number
    main: string
    description: string
    icon: string
  }]
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
  weather: [{
    id: number
    main: string
    description: string
    icon: string
  }]
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
  weather: [{
    id: number
    main: string
    description: string
    icon: string
  }]
  wind_deg: number
  wind_gust: number
  wind_speed: number
}

export interface OneCallResultMinutely {
  dt: number
  precipitation: number
}

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
  rain: {
    "1h": number
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
  weather: [{
    id: number
    main: "Clear"
    description: "clear sky"
    icon: "01d"
  }]
  wind: {
    deg: number
    speed: number
  }
}