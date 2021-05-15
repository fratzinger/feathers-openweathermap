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

  describe("current weather data", function() {
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

  // not included in free subscription
  describe.skip("hourlyForecast4Days", function() {
    it("get current weather by city name", async function() {
      const result = await service.hourlyForecast4Days({ cityName: "Munich", stateCode: "DE", countryCode: "DE" });
      assert.strictEqual(result.name, "Munich", "found correct city");
    });

    it("get current weather data by city id", async function() {
      const result = await service.hourlyForecast4Days({ cityId: 2844588 });
      assert.strictEqual(result.name, "Rostock", "found correct city");
    });

    it("get current weather by geo coordinates", async function() {
      const result = await service.hourlyForecast4Days({ lat: 52.520008, lon: 13.404954 });
      assert.strictEqual(result.name, "Mitte", "found correct 'city'");
    });

    it("get current weather by zip code", async function() {
      const result = await service.hourlyForecast4Days({ zipCode: "18057", countryCode: "DE" });
      assert.strictEqual(result.name, "Rostock", "found correct city");
    });
  });

  // not included in free subscription
  describe.skip("dailyForecast16Days", function() {
    it("get current weather by city name", async function() {
      const result = await service.dailyForecast16Days({ cityName: "Munich", stateCode: "DE", countryCode: "DE" });
      
      assert.strictEqual(result.name, "Munich", "found correct city");
    });

    it("get current weather data by city id", async function() {
      const result = await service.dailyForecast16Days({ cityId: 2844588 });
      
      assert.strictEqual(result.name, "Rostock", "found correct city");
    });

    it("get current weather by geo coordinates", async function() {
      const result = await service.dailyForecast16Days({ lat: 52.520008, lon: 13.404954 });
      
      assert.strictEqual(result.name, "Mitte", "found correct 'city'");
    });

    it("get current weather by zip code", async function() {
      const result = await service.dailyForecast16Days({ zipCode: "18057", countryCode: "DE" });
      
      assert.strictEqual(result.name, "Rostock", "found correct city");
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

  // not included in free subscription
  describe.skip("Climate forecast for 30 days", function() {
    it("get current weather by city name", async function() {
      const result = await service.climaticForecast30Days({ cityName: "Munich", stateCode: "DE", countryCode: "DE" });
      assert.strictEqual(result.name, "Munich", "found correct city");
    });

    it("get current weather data by city id", async function() {
      const result = await service.climaticForecast30Days({ cityId: 2844588 });
      assert.strictEqual(result.name, "Rostock", "found correct city");
    });

    it("get current weather by geo coordinates", async function() {
      const result = await service.climaticForecast30Days({ lat: 52.520008, lon: 13.404954 });
      assert.strictEqual(result.name, "Mitte", "found correct 'city'");
    });

    it("get current weather by zip code", async function() {
      const result = await service.climaticForecast30Days({ zipCode: "18057", countryCode: "DE" });
      assert.strictEqual(result.name, "Rostock", "found correct city");
    });
  });
});