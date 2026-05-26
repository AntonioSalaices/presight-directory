import express from "express";
import cors from "cors";

import "./db/database";
import usersRouter from "./routes/users";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET"],
  }),
);
app.use(express.json());

app.use("/api/users", usersRouter);

app.use(errorMiddleware);

export default app;
