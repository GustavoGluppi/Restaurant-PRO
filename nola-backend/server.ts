import { Router } from "express";
import { createApp } from "./config/express.js";
import dataRouter from "./api/routes/tablesRoutes.js";
import chartRouter from "./api/routes/chartRoutes.js";

const app = createApp();
const port = app.get("port");

// Setting app middleware routes
app.use(dataRouter);
app.use(chartRouter);

app.listen(port, () => {
  console.log("Server running on port", port);
});
