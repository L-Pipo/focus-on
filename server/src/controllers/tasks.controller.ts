import { Router, Response, Request } from "express";
import { urlToHttpOptions } from "url";

import { tasksService } from "../services/tasks.service";

export const tasksRouter = Router();

tasksRouter.post("/", async (req: Request, res: Response) => {
  let { title, description, day_id, completed, user_id } = req.body;
  try {
    const tasks = await tasksService.addTask(
      title,
      description,
      day_id,
      completed,
      user_id
    );
    res.send(tasks);
  } catch (error: any) {
    res.status(error.status || 500).send();
  }
});

tasksRouter.delete("/:id", async (req: Request, res: Response) => {
  let taskId = req.params.id;
  try {
    const deletedTask = await tasksService.deleteTask(taskId);
    res.send(deletedTask);
  } catch (error: any) {
    res.status(error.status || 500).send();
  }
});

tasksRouter.patch("/:id/completed", async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const changes = req.body;
  try {
    const updatedTask = await tasksService.updatedTask(taskId, changes);
    res.send(updatedTask);
  } catch (error: any) {
    res.status(error.status || 500).send();
  }
});
