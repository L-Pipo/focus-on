import { Router, Response, Request } from "express";

import { pomodoroService } from "../services/pomodoro.service";

export const pomodoroRouter = Router();

pomodoroRouter.post("/", async (req: Request, res: Response) => {
  let { user_id, day_id } = req.body;
  try {
    const pomodoros = await pomodoroService.addPomodoro(user_id, day_id);
    res.send(pomodoros);
  } catch (error: any) {
    res.status(error.status || 500).send();
  }
});
