import {
  CurrentWeatherDataData, 
  Endpoint, 
  OWMServiceOptions,
  CurrentWeatherDataResult,
  HourlyForecast4DaysResult,
  HourlyForecast4DaysData,
  QueryParams,
  OneCallResult,
  OneCallData,
  AnyData,
  AnyResult
} from "./types";
import {
  SetOptional,
  SetRequired 
} from "type-fest";
import got from "got/dist/source";
import { Params } from "@feathersjs/feathers";

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
  constructor(options: SetOptional<OWMServiceOptions, "v" | "lang" | "mode" | "units">) {
    this.options = makeOptions(options);
  }

  async find(params: Params & { query: CurrentWeatherDataData & { endpoint: "weather" } }): Promise<CurrentWeatherDataResult>
  async find(params: Params & { query: OneCallData & { endpoint: "onecall" } }): Promise<OneCallResult>
  async find(params: Params & { query: AnyData & { endpoint: Endpoint }}): Promise<AnyResult> {
    return await this.makeRequest(params.query, params.query.endpoint);
  }

  async create(data: CurrentWeatherDataData & { endpoint: "weather" }): Promise<CurrentWeatherDataResult>
  async create(data: OneCallData & { endpoint: "onecall" }): Promise<OneCallResult>
  async create(data: AnyData & { endpoint: Endpoint }): Promise<AnyResult> {
    return await this.makeRequest(data, data.endpoint);
  }

  private composeSearchParamsFromData(data): QueryParams {
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
    } as QueryParams;
    
    if (data.cityName) {
      const q = [data.cityName];
      if (data.stateCode) { q.push(data.stateCode); }
      if (data.countryCode) { q.push(data.countryCode); }
      query.q = q.join(",");
    } else if (data.cityId) {
      query.id = data.cityId;
    } else if (data.lat && data.lon) {
      query.lat = data.lat;
      query.lon = data.lon;
    } else if (data.zipCode) {
      const zip = [data.zipCode];
      if (data.countryCode) { zip.push(data.countryCode); }
      query.zip = zip.join(",");
    }

    return query;
  }

  private getUrl<D extends AnyData>(data: D, endpoint: Endpoint) {
    const v = data?.v || this.options.v;
    return `${baseUrl}/${v}/${endpoint}`;
  }

  private async makeRequest<D extends AnyData, R extends AnyResult>(data: D, endpoint: Endpoint): Promise<R> {
    const queryParams = this.composeSearchParamsFromData(data);
    const result = await got(this.getUrl(data, endpoint), {
      searchParams: queryParams as unknown as Record<string, string | number | boolean>
    });
    if (queryParams.mode === "json") {
      return JSON.parse(result.body);
    } else {
      return result.body as unknown as R;
    }
  }

  async currentWeatherData(
    data: CurrentWeatherDataData
  ): Promise<CurrentWeatherDataResult> {
    return await this.makeRequest(data, "weather");
  }

  async hourlyForecast4Days(
    data: HourlyForecast4DaysData
  ): Promise<any> {
    return await this.makeRequest(data, "forecast/hourly");
  }

  async oneCall(data: OneCallData): Promise<OneCallResult> {
    return await this.makeRequest(data, "onecall");
  }

  async dailyForecast16Days(data): Promise<any> {
    return await this.makeRequest(data, "forecast/daily");
  }

  async climaticForecast30Days(data): Promise<any> {
    return await this.makeRequest(data, "forecast/climate");
  }

}