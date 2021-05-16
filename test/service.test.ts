import assert from "assert";
import feathers, { Application } from "@feathersjs/feathers";
import { Service } from "../lib";

describe("service.test.ts", function() {
  let app: Application, 
    service: Service;
  before(function() {
    app = feathers();
    const createdService = new Service({
      appid: process.env.APPID
    });
    app.use("test", createdService);
    service = app.service("test");
  });

  describe("weather - 'current weather data'", function() {
    describe("find", async function() {
      it("find: get current weather by city name", async function() {
        const result = await service.find({ query: { endpoint: "weather", cityName: "Munich", stateCode: "DE" } });
        assert.strictEqual(result.name, "Munich", "found correct city");
      });

      it("find: get current weather data by city id", async function() {
        const result = await service.find({ query: { endpoint: "weather", cityId: 2844588 } });
        assert.strictEqual(result.name, "Rostock", "found correct city");
      });
    });

    describe("create", async function() {
      it("create: get current weather by city name", async function() {
        const result = await service.create({ endpoint: "weather", cityName: "Munich", stateCode: "DE" });
        assert.strictEqual(result.name, "Munich", "found correct city");
      });

      it("create: get current weather data by city id", async function() {
        const result = await service.create({ endpoint: "weather", cityId: 2844588 });
        assert.strictEqual(result.name, "Rostock", "found correct city");
      });
    });

    describe("custom method", function() {
      it("custom: get current weather by city name", async function() {
        const result = await service.currentWeatherData({ cityName: "Munich", stateCode: "DE", countryCode: "DE" });
        assert.strictEqual(result.name, "Munich", "found correct city");
      });
  
      it("custom: get current weather data by city id", async function() {
        const result = await service.currentWeatherData({ cityId: 2844588 });
        assert.strictEqual(result.name, "Rostock", "found correct city");
      });
  
      it("custom: get current weather by geo coordinates", async function() {
        const result = await service.currentWeatherData({ lat: 52.520008, lon: 13.404954 });
        assert.strictEqual(result.name, "Mitte", "found correct 'city'");
      });
  
      it("custom: get current weather by zip code", async function() {
        const result = await service.currentWeatherData({ zipCode: "18057", countryCode: "DE" });
        assert.strictEqual(result.name, "Rostock", "found correct city");
      });
    });
  });

  describe("onecall", function() {
    describe("find", function() {
      it("find: get onecall by geo coordinates", async function() {
        const result = await service.find({ query: { endpoint: "onecall", lat: 52.520008, lon: 13.404954 } });
        assert.ok(result.current, "has current");
        assert.ok(result.daily, "has daily");
        assert.ok(result.hourly, "has hourly");
        assert.ok(result.minutely, "has minutely");
      });
    });

    describe("create", function() {
      it("create: get onecall by geo coordinates", async function() {
        const result = await service.create({ endpoint: "onecall", lat: 52.520008, lon: 13.404954 });
        assert.ok(result.current, "has current");
        assert.ok(result.daily, "has daily");
        assert.ok(result.hourly, "has hourly");
        assert.ok(result.minutely, "has minutely");
      });
    });

    describe("custom method", function() {
      it("custom: get onecall by geo coordinates", async function() {
        const result = await service.oneCall({ lat: 52.520008, lon: 13.404954 });
        assert.ok(result.current, "has current");
        assert.ok(result.daily, "has daily");
        assert.ok(result.hourly, "has hourly");
        assert.ok(result.minutely, "has minutely");
      });
    });
  });

  describe("forecast - '5 Day / 3 Hour Forecast'", function() {
    describe("find", async function() {
      it("find: get forecast by city name", async function() {
        const result = await service.find({ query: { endpoint: "forecast", cityName: "Munich", stateCode: "DE" } });
        assert.strictEqual(result.city.name, "Munich", "found correct city");
      });

      it("find: get forecast data by city id", async function() {
        const result = await service.find({ query: { endpoint: "forecast", cityId: 2844588 } });
        assert.strictEqual(result.city.name, "Rostock", "found correct city");
      });
    });

    describe("create", async function() {
      it("create: get forecast by city name", async function() {
        const result = await service.create({ endpoint: "forecast", cityName: "Munich", stateCode: "DE" });
        assert.strictEqual(result.city.name, "Munich", "found correct city");
      });

      it("create: get forecast data by city id", async function() {
        const result = await service.create({ endpoint: "forecast", cityId: 2844588 });
        assert.strictEqual(result.city.name, "Rostock", "found correct city");
      });
    });

    describe("custom method", function() {
      it("custom: get forecast by city name", async function() {
        const result = await service.fiveDay3HourForecast({ cityName: "Munich", stateCode: "DE", countryCode: "DE" });
        assert.strictEqual(result.city.name, "Munich", "found correct city");
      });
  
      it("custom: get forecast data by city id", async function() {
        const result = await service.fiveDay3HourForecast({ cityId: 2844588 });
        assert.strictEqual(result.city.name, "Rostock", "found correct city");
      });
  
      it("custom: get forecast by geo coordinates", async function() {
        const result = await service.fiveDay3HourForecast({ lat: 52.520008, lon: 13.404954 });
        assert.strictEqual(result.city.name, "Mitte", "found correct 'city'");
      });
  
      it("custom: get forecast by zip code", async function() {
        const result = await service.fiveDay3HourForecast({ zipCode: "18057", countryCode: "DE" });
        assert.strictEqual(result.city.name, "Rostock", "found correct city");
      });
    });
  });

  // not included in free subscription
  describe.skip("forecast/hourly - 'hourlyForecast4Days'", function() {
    describe("find", async function() {
      it("find: get hourly forecast by city name", async function() {
        const result = await service.find({ query: { endpoint: "forecast/hourly", cityName: "Munich", stateCode: "DE" } });
        assert.strictEqual(result.city.name, "Munich", "found correct city");
      });

      it("find: get hourly forecast data by city id", async function() {
        const result = await service.find({ query: { endpoint: "forecast/hourly", cityId: 2844588 } });
        assert.strictEqual(result.city.name, "Rostock", "found correct city");
      });
    });

    describe("create", async function() {
      it("create: get hourly forecast by city name", async function() {
        const result = await service.create({ endpoint: "forecast/hourly", cityName: "Munich", stateCode: "DE" });
        assert.strictEqual(result.city.name, "Munich", "found correct city");
      });

      it("create: get hourly forecast data by city id", async function() {
        const result = await service.create({ endpoint: "forecast/hourly", cityId: 2844588 });
        assert.strictEqual(result.city.name, "Rostock", "found correct city");
      });
    });

    describe("custom method", function() {
      it("get hourly forecast by city name", async function() {
        const result = await service.hourlyForecast4Days({ cityName: "Munich", stateCode: "DE", countryCode: "DE" });
        assert.strictEqual(result.city.name, "Munich", "found correct city");
      });
  
      it("get hourly forecast data by city id", async function() {
        const result = await service.hourlyForecast4Days({ cityId: 2844588 });
        assert.strictEqual(result.city.name, "Rostock", "found correct city");
      });
  
      it("get hourly forecast by geo coordinates", async function() {
        const result = await service.hourlyForecast4Days({ lat: 52.520008, lon: 13.404954 });
        assert.strictEqual(result.city.name, "Mitte", "found correct 'city'");
      });
  
      it("get hourly forecast by zip code", async function() {
        const result = await service.hourlyForecast4Days({ zipCode: "18057", countryCode: "DE" });
        assert.strictEqual(result.city.name, "Rostock", "found correct city");
      });
    });
  });

  // not included in free subscription
  describe.skip("forecast/daily - 'dailyForecast16Days'", function() {
    it("get daily forecast by city name", async function() {
      const result = await service.dailyForecast16Days({ cityName: "Munich", stateCode: "DE", countryCode: "DE" });
      
      assert.strictEqual(result.city.name, "Munich", "found correct city");
    });

    it("get daily forecast data by city id", async function() {
      const result = await service.dailyForecast16Days({ cityId: 2844588 });
      
      assert.strictEqual(result.city.name, "Rostock", "found correct city");
    });

    it("get daily forecast by geo coordinates", async function() {
      const result = await service.dailyForecast16Days({ lat: 52.520008, lon: 13.404954 });
      
      assert.strictEqual(result.city.name, "Mitte", "found correct 'city'");
    });

    it("get daily forecast by zip code", async function() {
      const result = await service.dailyForecast16Days({ zipCode: "18057", countryCode: "DE" });
      
      assert.strictEqual(result.city.name, "Rostock", "found correct city");
    });
  });

  // not included in free subscription
  describe.skip("forecast/climate - 'Climate forecast for 30 days'", function() {
    it("get climatic forecast by city name", async function() {
      const result = await service.climaticForecast30Days({ cityName: "Munich", stateCode: "DE", countryCode: "DE" });
      assert.strictEqual(result.city.name, "Munich", "found correct city");
    });

    it("get climatic forecast data by city id", async function() {
      const result = await service.climaticForecast30Days({ cityId: 2844588 });
      assert.strictEqual(result.city.name, "Rostock", "found correct city");
    });

    it("get climatic forecast by geo coordinates", async function() {
      const result = await service.climaticForecast30Days({ lat: 52.520008, lon: 13.404954 });
      assert.strictEqual(result.city.name, "Mitte", "found correct 'city'");
    });

    it("get climatic forecast by zip code", async function() {
      const result = await service.climaticForecast30Days({ zipCode: "18057", countryCode: "DE" });
      assert.strictEqual(result.city.name, "Rostock", "found correct city");
    });
  });

  describe("air_pollution", function() {
    describe("current air pollution", function() {
      it("find: get current air pollution", async function() {
        const result = await service.find({ query: { endpoint: "air_pollution", lat: 52.520008, lon: 13.404954 } });
        assert.deepStrictEqual(result.coord, { lat: 52.52, lon: 13.405 }, "returned something");
        assert.strictEqual(result.list.length, 1, "has one list entry");
        assert.ok(1 <= result.list[0].main.aqi && result.list[0].main.aqi <= 5, "air quality is between 1 and 5");
      });

      it("create: get current air pollution", async function() {
        const result = await service.create({ endpoint: "air_pollution", lat: 52.520008, lon: 13.404954 });
        assert.deepStrictEqual(result.coord, { lat: 52.52, lon: 13.405 }, "returned something");
        assert.strictEqual(result.list.length, 1, "has one list entry");
        assert.ok(1 <= result.list[0].main.aqi && result.list[0].main.aqi <= 5, "air quality is between 1 and 5");
      });

      it("custom: get current air pollution", async function() {
        const result = await service.airPollutionCurrent({ lat: 52.520008, lon: 13.404954 });
        assert.deepStrictEqual(result.coord, { lat: 52.52, lon: 13.405 }, "returned something");
        assert.strictEqual(result.list.length, 1, "has one list entry");
        assert.ok(1 <= result.list[0].main.aqi && result.list[0].main.aqi <= 5, "air quality is between 1 and 5");
      });
    });

    describe("forecast air pollution", function() {
      it("find: get forecast air pollution", async function() {
        const result = await service.find({ query: { endpoint: "air_pollution/forecast", lat: 52.520008, lon: 13.404954 } });
        assert.deepStrictEqual(result.coord, { lat: 52.52, lon: 13.405 }, "returned something");
        assert.strictEqual(result.list.length, 241, "has full list");
        assert.ok(1 <= result.list[0].main.aqi && result.list[0].main.aqi <= 5, "air quality is between 1 and 5");
      });

      it("create: get forecast air pollution", async function() {
        const result = await service.create({ endpoint: "air_pollution/forecast", lat: 52.520008, lon: 13.404954 });
        assert.deepStrictEqual(result.coord, { lat: 52.52, lon: 13.405 }, "returned something");
        assert.strictEqual(result.list.length, 241, "has full list");
        assert.ok(1 <= result.list[0].main.aqi && result.list[0].main.aqi <= 5, "air quality is between 1 and 5");
      });

      it("custom: get forecast air pollution", async function() {
        const result = await service.airPollutionForecast({ lat: 52.520008, lon: 13.404954 });
        assert.deepStrictEqual(result.coord, { lat: 52.52, lon: 13.405 }, "returned something");
        assert.strictEqual(result.list.length, 241, "has full list");
        assert.ok(1 <= result.list[0].main.aqi && result.list[0].main.aqi <= 5, "air quality is between 1 and 5");
      });
    });

    describe("historical air pollution", function() {
      it("find: get historical air pollution", async function() {
        const result = await service.find({ query: { endpoint: "air_pollution/history", start: 1606223802, end: 1606482999, lat: 52.520008, lon: 13.404954 } });
        assert.deepStrictEqual(result.coord, { lat: 52.52, lon: 13.405 }, "returned something");
        assert.strictEqual(result.list.length, 61, "has full list");
        assert.ok(1 <= result.list[0].main.aqi && result.list[0].main.aqi <= 5, "air quality is between 1 and 5");
      });

      it("create: get historical air pollution", async function() {
        const result = await service.create({ endpoint: "air_pollution/history", start: 1606223802, end: 1606482999, lat: 52.520008, lon: 13.404954 });
        assert.deepStrictEqual(result.coord, { lat: 52.52, lon: 13.405 }, "returned something");
        assert.strictEqual(result.list.length, 61, "has full list");
        assert.ok(1 <= result.list[0].main.aqi && result.list[0].main.aqi <= 5, "air quality is between 1 and 5");
      });

      it("custom: get historical air pollution", async function() {
        const result = await service.airPollutionHistorical({ start: 1606223802, end: 1606482999, lat: 52.520008, lon: 13.404954 });
        assert.deepStrictEqual(result.coord, { lat: 52.52, lon: 13.405 }, "returned something");
        assert.strictEqual(result.list.length, 61, "has full list");
        assert.ok(1 <= result.list[0].main.aqi && result.list[0].main.aqi <= 5, "air quality is between 1 and 5");
      });
    });
  });
});