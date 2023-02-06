import { Router, Response, Request } from "express";

import { pomodoroService } from "../services/pomodoro.service";

export const pomodoroRouter = Router();

pomodoroRouter.get("/:userId/:day", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const dayId = req.params.day;
  try {
    const pomodoros = await pomodoroService.getPomodoro(userId, dayId);
    res.send(pomodoros);
  } catch (error: any) {
    res.status(error.status || 500).send();
  }
});

pomodoroRouter.post("/", async (req: Request, res: Response) => {
  let { day_id, user_id } = req.body;
  try {
    const pomodoros = await pomodoroService.addPomodoro(day_id, user_id);
    res.send(pomodoros);
  } catch (error: any) {
    res.status(error.status || 500).send();
  }
});
