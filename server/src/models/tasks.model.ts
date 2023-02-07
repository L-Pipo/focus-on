import { db } from "../database/db.helper";

import { Task } from "../types/task";

export const tasksModel = {
  getTasksByDay(userId: any, day: any) {
    return db(
      `SELECT * FROM tasks WHERE user_id=${userId} AND day_id=${day}`
    ).then((result) => result.data);
  },

  addTask(
    title: any,
    description: any,
    day_id: any,
    completed: any,
    user_id: any
  ) {
    return db(
      `INSERT INTO tasks (title, description, day_id, completed, user_id)
    VALUES ('${title}', '${description}', ${day_id}, ${completed}, ${user_id});`
    ).then((result) => result.data);
  },

  deleteTask(taskId: any) {
    return db(`DELETE FROM tasks WHERE id=${taskId}`);
  },

  updatedTask(taskId: any, changes: any) {
    db(`UPDATE tasks SET completed=${changes.completed} WHERE id=${taskId}`);
    return db(`SELECT * FROM tasks WHERE id=${taskId}`);
  },
};
