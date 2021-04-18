import { Endpoint, OWMServiceOptions } from "./types";
import {
  SetOptional,
  SetRequired 
} from "type-fest";
import got from "got/dist/source";

const makeOptions = (options: SetRequired<Partial<OWMServiceOptions>, "appid">): OWMServiceOptions => {
  return {
    v: "2.5",
    mode: "json",
    lang: "en",
    units: "standard",
    ...options
  };
};

const baseUrl = "https://api.openweathermap.org/data";

export class Service {
  options: OWMServiceOptions
  constructor(options: SetOptional<OWMServiceOptions, "v">) {
    this.options = makeOptions(options);
  }

  async _find(params) {
    return await this.makeRequest(params.query, params.query.endpoint);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async _create(data, params) {
    return await this.makeRequest(data, data.endpoint);
  }

  private composeSearchParamsFromData(data): Record<string, string> {
    data = Object.assign({}, data);
    const appid = data?.appid || this.options.appid;
    const lang = data?.lang || this.options.lang;
    const mode = data?.mode || this.options.mode;
    const units = data?.units || this.options.units;

    const query = { 
      appid,
      lang,
      mode,
      units
    };
    
    if (data.cityName) {
      const q = [data.cityName];
      if (data.stateCode) { q.push(data.stateCode); }
      if (data.countryCode) { q.push(data.countryCode); }
      query.q = q.join(",");
    } else if (data.cityId) {
      query.id = data.cityId;
    } else if (data.latitude && data.longitude) {
      query.lat = data.latitude;
      query.lon = data.longitude;
    } else if (data.zipCode) {
      const zip = [data.zipCode];
      if (data.countryCode) { zip.push(data.countryCode); }
      query.zip;
    }

    return query;
  }

  private getUrl(data, endpoint: Endpoint) {
    const v = data?.v || this.options.v;
    return `${baseUrl}/${v}/${endpoint}`;
  }

  private async makeRequest(data, endpoint: Endpoint) {
    return await got(this.getUrl(data, endpoint), { 
      searchParams: this.composeSearchParamsFromData(data)
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async currentWeatherData(data, params) {
    return await this.makeRequest(data, "weather");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async hourlyForecast4Days(data, params) {
    return await this.makeRequest(data, "forecast/hourly");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async oneCall(data, params) {
    return await this.makeRequest(data, "onecall");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async dailyForecast16Days(data, params) {
    return await this.makeRequest(data, "forecast/daily");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async climaticForecast30Days(data, params) {
    return await this.makeRequest(data, "forecast/climate");
  }

}