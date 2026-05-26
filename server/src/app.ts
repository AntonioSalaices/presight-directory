import express from "express";

import "./db/database";
import usersRouter from "./routes/users";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use("/api/users", usersRouter);

app.use(errorMiddleware);

export default app;
