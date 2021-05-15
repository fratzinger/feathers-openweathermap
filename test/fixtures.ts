import dotenv from "dotenv";

export const mochaGlobalSetup = function (): void {
  dotenv.config();
  if (!process.env?.APPID) {
    throw new Error("'process.env.APPID' is not defined! Get an 'appid' at https://openweathermap.org/appid.");
  }
};