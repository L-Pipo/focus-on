import { Router, Request, Response } from "express";

import { Task } from "../types/task";

import { db } from "../model/helper";
import { escapeQuote } from "../utils/escapeQuote";
import { getErrorMessage } from "../utils/getErrorMessage";

export const tasksRouter = Router();

// GET all task for a day

tasksRouter.get("/:userId/:day", async function (req: Request, res: Response) {
  let userId = req.params.userId;
  let day = req.params.day;
  try {
    let tasks: Task[] = (
      await db(`SELECT * FROM tasks WHERE user_id=${userId} AND day_id=${day}`)
    ).data;
    if (tasks.length === 0) {
      res
        .status(404)
        .send({ error: "There are no tasks for the requested day" });
    } else {
      res.send(tasks);
    }
  } catch (err) {
    res.status(500).send({ error: getErrorMessage(err) });
  }
});

// INSERT a new task into the DB

// insert middleware function ensureSameUser in post and delete method?

tasksRouter.post("/", async (req: Request, res: Response) => {
  let { title, description, day_id, completed, user_id } = req.body;
  title = escapeQuote(title);
  description = escapeQuote(description);
  let sql = `
      INSERT INTO tasks (title, description, day_id, completed, user_id)
      VALUES ('${title}', '${description}', ${day_id}, ${completed}, ${user_id} )
  `;
  try {
    await db(sql);
    let tasks: Task[] = (
      await db(`SELECT * FROM tasks WHERE user_id=${user_id}`)
    ).data;
    res.status(201).send(tasks);
  } catch (err) {
    res.status(500).send({ error: getErrorMessage(err) });
  }
});

// DELETE a task from DB

tasksRouter.delete("/:id", async function (req: Request, res: Response) {
  let taskId = req.params.id;
  try {
    let task: Task[] = (await db(`SELECT * FROM tasks WHERE id=${taskId}`))
      .data;
    if (task.length === 0) {
      res.status(404).send({ error: "Task not found" });
    } else {
      await db(`DELETE FROM tasks WHERE id=${taskId}`);
      let tasks: Task[] = (await db(`SELECT * FROM tasks`)).data;
      res.status(201).send(tasks);
    }
  } catch (err) {
    res.status(500).send({ error: getErrorMessage(err) });
  }
});

// UPDATE completed in task

tasksRouter.patch(
  "/:id/completed",
  async function (req: Request, res: Response) {
    const taskId = req.params.id;
    const changes = req.body;
    try {
      await db(
        `UPDATE tasks SET completed=${changes.completed} WHERE id=${taskId}`
      );
      let updatedTask: Task[] = (
        await db(`SELECT * FROM tasks WHERE id=${taskId}`)
      ).data;
      res.status(201).send(updatedTask);
    } catch (err) {
      res.status(500).send({ error: getErrorMessage(err) });
    }
  }
);
