import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
config();

export function createApp() {
  const app = express();

  // Setting application port
  app.set("port", process.env.PORT || 8080);

  // Setting app middlewares to JSON
  app.use(bodyParser.json());

  return app;
}
