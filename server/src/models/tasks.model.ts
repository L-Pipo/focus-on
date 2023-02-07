import { db } from "../database/db.helper";

import { escapeQuote } from "../utils/escapeQuote";

import { Task } from "../types/task";

export const tasksModel = {
  async addTask(
    title: any,
    description: any,
    day_id: any,
    completed: any,
    user_id: any
  ): Promise<Task[]> {
    title = escapeQuote(title);
    description = escapeQuote(description);
    await db(`INSERT INTO tasks (title, description, day_id, completed, user_id)
VALUES ('${title}', '${description}', ${day_id}, ${completed}, ${user_id});`);
    let todayTask = (
      await db(
        `SELECT * FROM tasks WHERE user_id=${user_id} AND day_id=${day_id}`
      )
    ).data;
    return todayTask;
  },

  async deleteTask(taskId: any): Promise<Task> {
    return await db(`DELETE FROM tasks WHERE id=${taskId}`);
  },

  async updatedTask(taskId: any, changes: any) {
    await db(
      `UPDATE tasks SET completed=${changes.completed} WHERE id=${taskId}`
    );
    return db(`SELECT * FROM tasks WHERE id=${taskId}`);
  },
};
