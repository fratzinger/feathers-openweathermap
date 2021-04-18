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

export interface ByCityName extends WithAppId {
  cityName: string
  stateCode?: string
  countryCode?: string
}

export interface ByCityId extends WithAppId {
  cityId: number
}

export interface ByGeoGraphicCoordinates extends WithAppId {
  latitude: string
  longitude: string
}

export interface ByZipCode extends WithAppId {
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

export interface ResultCurrentWeatherData<T> {
  coord: {
    lon: Longitude
    lat: Latitude
  },
  weather: [
    {
      id: number
      main: "Clear"
      description: "clear sky"
      icon: "01d"
    }
  ]
  base: "stations"
  main: {
    temp: T
    feels_like: T
    temp_min: T
    temp_max: T
    pressure: number
    humidity: number
  },
  visibility: number
  wind: {
    "speed": number
    "deg": number
  }
  clouds: {
    all: 1
  }
  dt: number
  sys: {
    type: 1
    id: number
    message: number
    country: "US"
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: 200
}