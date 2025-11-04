import { Router } from "express";
import { createApp } from "./config/express.js";
import dataRouter from "./api/routes/tablesRoutes.js";
import chartRouter from "./api/routes/chartRoutes.js";
import cors from "cors";

const app = createApp();
const port = app.get("port");

// Allowing only frontend to make requests
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Setting app middleware routes
app.use(dataRouter);
app.use(chartRouter);

app.listen(port, () => {
  console.log("Server running on port", port);
});
