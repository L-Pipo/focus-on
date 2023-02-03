import { Router, Response, Request } from "express";

import { pomodoroService } from "../services/pomodoro.service";

export const pomodoroRouter = Router();

pomodoroRouter.get("/:userId/:day", (req: Request, res: Response) => {
  pomodoroService
    .getPomodoro(req.params.userId, req.params.day)
    .then((data) => res.send(data))
    .catch((error) => res.status(error.status || 500).send());
});

pomodoroRouter.post("/", (req: Request, res: Response) => {
  let { day_id, user_id } = req.body;
  pomodoroService
    .addPomodoro(day_id, user_id)
    .then((data) => res.send(data))
    .catch((error) => res.status(error.status || 500).send());
});
