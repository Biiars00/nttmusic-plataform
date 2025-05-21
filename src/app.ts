import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import "./dependencies/dependencies";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./docs/swagger.json";
import { RegisterRoutes } from "./routes/routes";

dotenv.config();

const app: Application = express();

const allowedOrigins = [
  process.env.FRONTEND_URL_DEV || '',
  process.env.FRONTEND_URL_PROD || '',
  process.env.BACKEND_PROD || '',
  process.env.BACKEND_DEV || '',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true
  }),
);

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("Bem-vindo à API Music Plataform!");
});

RegisterRoutes(app);

app.use((_req, res) => {
  res.status(404).send({ status: "Not Found!" });
});

export default app;
