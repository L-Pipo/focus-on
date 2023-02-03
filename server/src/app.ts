import cors from "cors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

// import { tasksRouter } from "./routes/tasks";
import { tasksRouter } from "./controllers/tasks.controller";
import { daysRouter } from "./routes/days";
// import { pomodoroRouter } from "./routes/pomodoro";
import { pomodoroRouter } from "./controllers/pomodoro.controller";
import { authRouter } from "./routes/auth";
import { usersRouter } from "./routes/users";

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/tasks", tasksRouter);
app.use("/days", daysRouter);
app.use("/pomodoro", pomodoroRouter);
app.use("/users", usersRouter);
app.use("/", authRouter);

export default app;
