import { Router, Response, Request } from "express";

import { escapeQuote } from "../utils/escapeQuote";
import { getErrorMessage } from "../utils/getErrorMessage";

import { tasksService } from "../services/tasks.service";

export const tasksRouter = Router();

tasksRouter.get("/:userId/:day", (req: Request, res: Response) => {
  tasksService
    .getTasksByDay(req.params.userId, req.params.day)
    .then((data) => res.send(data))
    .catch((error) => res.status(error.status || 500).send());
});

tasksRouter.post("/", (req: Request, res: Response) => {
  let { title, description, day_id, completed, user_id } = req.body;
  tasksService
    .addTask(title, description, day_id, completed, user_id)
    .then((data: any) => res.send(data))
    .catch((error: any) => res.status(error.status || 500).send());
});

tasksRouter.delete("/:id", (req: Request, res: Response) => {
  let taskId = req.params.id;
  tasksService
    .deleteTask(taskId)
    .then((data: any) => res.send(data))
    .catch((error: any) => res.status(error.status || 500).send());
});

// tasksRouter.patch("/:id/completed", (req: Request, res: Response) => {
//   const taskId = req.params.id;
//   const changes = req.body;
//   tasksService
//     .updatedTask(taskId, changes)
//     .then((data: any) => res.send(data))
//     .catch((error: any) => res.status(error.status || 500).send());
// });

// tasksRouter.patch(
//   "/:id/completed",
//   async function (req: Request, res: Response) {
//     const taskId = req.params.id;
//     const changes = req.body;
//     try {
//       await db(
//         `UPDATE tasks SET completed=${changes.completed} WHERE id=${taskId}`
//       );
//       let updatedTask: Task[] = (
//         await db(`SELECT * FROM tasks WHERE id=${taskId}`)
//       ).data;
//       res.status(201).send(updatedTask);
//     } catch (err) {
//       res.status(500).send({ error: getErrorMessage(err) });
//     }
//   }
// );

// tasksRouter.get("/:userId/:day", async function (req: Request, res: Response) {
//   // pass arguments (userId, day) to tasksService
//   // controller does not want to think about logic
//   // pure logic is a task of tasksService
//   // therefore the controller does not have to deal with else/if statement and the 404 error
//   // try catch block is in controller
//   // controller decides whether he gives back data or a 500 error
//   tasksService.getTasksByDay(req.params.userId, req.params.day);
//   // try catch block might be incorrect
//   // try to send back data
//   // if that is not possible, send back error message
//   try {
//     (data: any) => res.send(data);
//   } catch {
//     () => res.status(500).send();
//   }
// });
